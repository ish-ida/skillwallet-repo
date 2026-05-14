/**
 * Validation Middleware — validateRegister.js
 * Validates name, email, and password from request body
 * before passing the request to the controller.
 */

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  // ── Step 3.1: Validate Required Fields ──────────────────────────────────────
  if (!name || name.trim() === "") {
    errors.push({ field: "name", message: "Name is required." });
  }

  if (!email || email.trim() === "") {
    errors.push({ field: "email", message: "Email is required." });
  }

  if (!password || password.trim() === "") {
    errors.push({ field: "password", message: "Password is required." });
  }

  // ── Step 3.2: Email Format Validation ────────────────────────────────────────
  if (email && email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push({ field: "email", message: "Invalid email format." });
    }
  }

  // ── Step 3.3: Password Length Validation ─────────────────────────────────────
  if (password && password.trim() !== "") {
    if (password.length < 6) {
      errors.push({
        field: "password",
        message: "Password must be at least 6 characters long.",
      });
    }
  }

  // ── Step 4.2: Send Structured Validation Errors ──────────────────────────────
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors,
    });
  }

  // ── Step 5.2: Prevent invalid requests from reaching controller ───────────────
  next();
}

module.exports = validateRegister;
