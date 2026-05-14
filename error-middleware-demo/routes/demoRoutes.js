const express = require("express");
const router = express.Router();
const AppError = require("../errors/AppError");

// ─── SUCCESS ROUTE ────────────────────────────────────────────────────────────
// GET /success
// Returns a normal 200 response — no errors involved.
router.get("/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Everything went smoothly!",
    data: { user: "demo-user", timestamp: new Date().toISOString() },
  });
});

// ─── GENERIC ERROR ROUTE ──────────────────────────────────────────────────────
// GET /error
// Throws a generic 500 error to demonstrate basic error catching.
router.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong");
  next(err); // forward to the global error middleware
});

// ─── CUSTOM ERROR ROUTE ───────────────────────────────────────────────────────
// GET /custom-error
// Throws a custom AppError with a specific status code and message.
router.get("/custom-error", (req, res, next) => {
  next(new AppError("This is a custom 400 Bad Request error", 400));
});

// ─── ASYNC ERROR ROUTE ────────────────────────────────────────────────────────
// GET /async-error
// Simulates an async operation (e.g., DB call) that rejects.
router.get("/async-error", async (req, res, next) => {
  try {
    await Promise.reject(new AppError("Database connection failed", 503));
  } catch (err) {
    next(err);
  }
});

// ─── UNAUTHORIZED ROUTE ───────────────────────────────────────────────────────
// GET /unauthorized
// Returns a 401 Unauthorized error.
router.get("/unauthorized", (req, res, next) => {
  next(new AppError("You are not authorized to access this resource", 401));
});

module.exports = router;
