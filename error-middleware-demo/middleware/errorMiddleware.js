/**
 * Global Error-Handling Middleware
 *
 * Express identifies error-handling middleware by its 4-argument signature:
 *   (err, req, res, next)
 * It must be registered AFTER all routes.
 */
const errorMiddleware = (err, req, res, next) => {
  // Default to 500 if status code is not set
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error for server-side visibility
  console.error(`[ERROR] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  // Send a structured, standardised error response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
