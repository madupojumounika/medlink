export const apiResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  errors = null,
) => {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data) response.data = data;
  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};
