export default function Print(req, res, next) {
  console.log(
    "\n\x1b[33m%s\x1b[0m \x1b[31m%s\x1b[0m \x1b[36m%s\x1b[0m\n",
    new Date().toLocaleString(),
    req.method,
    req.originalUrl
  );
  next();
}
