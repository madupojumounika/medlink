export const apiResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  errors = null,
  meta = null
) => {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
};
