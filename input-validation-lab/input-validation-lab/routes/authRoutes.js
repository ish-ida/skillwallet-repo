/**
 * Routes — authRoutes.js
 * Wires the validation middleware and controller together for auth endpoints.
 */

const express = require("express");
const router = express.Router();

const validateRegister = require("../middleware/validateRegister");
const { registerUser } = require("../controllers/registerController");

// POST /register
// Middleware runs first → controller runs only if validation passes
router.post("/register", validateRegister, registerUser);

module.exports = router;
