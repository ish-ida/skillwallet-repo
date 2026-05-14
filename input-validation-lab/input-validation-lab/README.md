# Input Validation Lab

A Node.js + Express.js app demonstrating structured input validation using middleware.

## Project Structure

```
input-validation-lab/
├── index.js                        # Express server entry point
├── routes/
│   └── authRoutes.js               # Route definitions
├── middleware/
│   └── validateRegister.js         # Input validation middleware
├── controllers/
│   └── registerController.js       # Business logic (only runs on valid input)
├── package.json
└── README.md
```

## Setup & Run

```bash
npm install
node index.js
```

Server starts on **http://localhost:3000**

---

## API Endpoint

### POST /register

Registers a user after validating the request body.

**Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

---

## Step 5: Postman Test Scenarios

### ✅ Test 1 — Valid Input
**Body:**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secure99" }
```
**Expected:** `201 Created`
```json
{ "success": true, "message": "User registered successfully.", "data": { ... } }
```

---

### ❌ Test 2 — Missing Fields (all empty)
**Body:** `{}`

**Expected:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    { "field": "name", "message": "Name is required." },
    { "field": "email", "message": "Email is required." },
    { "field": "password", "message": "Password is required." }
  ]
}
```

---

### ❌ Test 3 — Invalid Email Format
**Body:**
```json
{ "name": "John", "email": "not-an-email", "password": "secure99" }
```
**Expected:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    { "field": "email", "message": "Invalid email format." }
  ]
}
```

---

### ❌ Test 4 — Password Too Short (less than 6 characters)
**Body:**
```json
{ "name": "John", "email": "john@example.com", "password": "abc" }
```
**Expected:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    { "field": "password", "message": "Password must be at least 6 characters long." }
  ]
}
```

---

### ❌ Test 5 — Missing Name Only
**Body:**
```json
{ "email": "john@example.com", "password": "secure99" }
```
**Expected:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    { "field": "name", "message": "Name is required." }
  ]
}
```

---

## Validation Rules Summary

| Field    | Rules                                      |
|----------|--------------------------------------------|
| name     | Required, non-empty                        |
| email    | Required, must match valid email format    |
| password | Required, minimum 6 characters             |
```
