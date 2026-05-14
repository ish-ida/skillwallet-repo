/**
 * Register Controller — registerController.js
 * Only reached when input has passed all validation middleware checks.
 */

function registerUser(req, res) {
  const { name, email, password } = req.body;

  // In a real app, you would hash the password and save to a database here.
  // For this lab, we just return a success response with the received data.
  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      // Never return the real password — show masked version for demo purposes
      password: "*".repeat(password.length),
    },
  });
}

module.exports = { registerUser };
