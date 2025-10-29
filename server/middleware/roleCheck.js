// Middleware to check user roles
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const hasRole = roles.includes(req.user.role);
    if (!hasRole) {
      return res.status(403).json({ msg: 'You are not allowed to access this resource' });
    }
    
    next();
  };
};

// We make each role check specific for better security
module.exports = {
  isInstructor: checkRole(['INSTRUCTOR']),
  isAdmin: checkRole(['ADMIN']),
  isStudent: checkRole(['STUDENT']) // <-- This is now more secure
};
