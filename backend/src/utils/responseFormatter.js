const successResponse = (res, data, message = 'Success', code = 200) => {
  res.status(code).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message = 'Error', error = 'SERVER_ERROR', code = 500, data = null) => {
  const body = {
    success: false,
    message,
    error,
  };
  if (data !== null) body.data = data;
  res.status(code).json(body);
};

module.exports = {
  successResponse,
  errorResponse,
};
