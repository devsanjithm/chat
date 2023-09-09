export default function response(
  message,
  data = {},
  status = true,
  code,
  error = {}
) {
  return {
    message,
    data,
    status,
    code,
    error,
    env: process?.env?.ENV,
  };
}
