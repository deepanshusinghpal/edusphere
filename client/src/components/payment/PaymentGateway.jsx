import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PaymentGateway = ({ courseId, price, title }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', null
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Create order on the server
      const res = await axios.post('/api/v1/payments/create-order', { courseId });
      const { orderId, amount, currency, keyId } = res.data;
      
      // Initialize Razorpay payment
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "EduSphere",
        description: `Enrollment for ${title}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment on the server
            const verifyRes = await axios.post('/api/v1/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            if (verifyRes.data.success) {
              setPaymentStatus('success');
              toast.success('Payment successful! You are now enrolled in the course.');
              setTimeout(() => {
                navigate(`/dashboard/courses/${courseId}`);
              }, 2000);
            }
          } catch (err) {
            setPaymentStatus('failed');
            toast.error(err.response?.data?.msg || 'Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: "#3B82F6"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };
      
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.msg || 'Failed to initiate payment');
    }
  };
  
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="mt-4">
      {paymentStatus === 'success' ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
          <FaCheckCircle className="mr-2" />
          <span>Payment successful! Redirecting to your course...</span>
        </div>
      ) : paymentStatus === 'failed' ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
          <FaTimesCircle className="mr-2" />
          <span>Payment failed. Please try again.</span>
        </div>
      ) : (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="btn-primary w-full flex justify-center items-center"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>Enroll Now for ₹{price}</>
          )}
        </button>
      )}
    </div>
  );
};

export default PaymentGateway;