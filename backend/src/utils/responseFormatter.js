const successResponse = (res, data, message = 'Success', code = 200) => {
  res.status(code).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message = 'Error', error = 'SERVER_ERROR', code = 500) => {
  res.status(code).json({
    success: false,
    message,
    error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
