const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongodb validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }

  // Mongodb duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    const field = Object.keys(err.keyPattern)[0];
    return res.status(statusCode).json({
      success: false,
      message,
      errors: [{ field, message: `${field} already exists` }]
    });
  }

  // Mongodb cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;