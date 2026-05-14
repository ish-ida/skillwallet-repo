/**
 * Input Validation Lab — index.js
 * Express server with input validation on the /register route.
 *
 * Start:  node index.js
 * Server: http://localhost:3000
 */

const express = require("express");
const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // Parse incoming JSON bodies

// ── Routes ────────────────────────────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log("  POST /register  — register a new user (with input validation)");
});
