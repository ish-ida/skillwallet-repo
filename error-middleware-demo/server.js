const express = require("express");
const demoRoutes = require("./routes/demoRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const AppError = require("./errors/AppError");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── BUILT-IN MIDDLEWARE ──────────────────────────────────────────────────────
app.use(express.json()); // parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/", demoRoutes);

// ─── 404 FALLBACK ─────────────────────────────────────────────────────────────
// Catch any request that doesn't match a defined route.
// Must come AFTER all valid routes, but BEFORE the error middleware.
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
});

// ─── GLOBAL ERROR MIDDLEWARE ──────────────────────────────────────────────────
// Must be registered LAST, after all routes and the 404 handler.
// Express recognises it by the 4-argument signature (err, req, res, next).
app.use(errorMiddleware);

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log("  GET /success       → 200 success response");
  console.log("  GET /error         → generic 500 error");
  console.log("  GET /custom-error  → custom 400 AppError");
  console.log("  GET /async-error   → simulated async 503 error");
  console.log("  GET /unauthorized  → 401 Unauthorized error");
  console.log("  GET /anything-else → 404 Not Found");
});

module.exports = app;
