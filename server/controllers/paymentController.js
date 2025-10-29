const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order
const createOrder = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({ msg: 'Course ID is required' });
  }

  try {
    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    if (existingEnrollment) {
      return res.status(400).json({ msg: 'You are already enrolled in this course' });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const options = {
      amount: Math.round(course.price * 100),
      currency: 'INR',
      receipt: `receipt_${courseId}_${userId}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    console.error('Payment order creation error:', err);
    res.status(500).send('Server Error');
  }
};

// @desc    Verify payment and enroll user
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId) {
    return res.status(400).json({ message: "All payment details are required" });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    try {
      await prisma.enrollment.create({
        data: {
          userId: userId,
          courseId: courseId,
          paymentStatus: 'COMPLETED',
          paymentId: razorpay_payment_id,
        },
      });
      
      res.status(200).json({ success: true, message: 'Payment verified and enrollment successful' });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: "You are already enrolled in this course." });
      }
      res.status(500).json({ message: "Error saving enrollment to the database." });
    }
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};

// @desc    Get payment history for a user
const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const payments = await prisma.payment.findMany({
            where: { userId },
            include: { course: { select: { title: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = {
  createOrder,
  verifyPayment,
  getPaymentHistory,
};

