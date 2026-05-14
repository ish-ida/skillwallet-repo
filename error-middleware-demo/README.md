# Express Error Middleware Demo

A clean, well-structured Node.js/Express project demonstrating global error-handling middleware — including custom error classes, async error propagation, structured JSON error responses, and 404 fallback handling.

---

## Project Structure

```
error-middleware-demo/
├── errors/
│   └── AppError.js          # Custom error class with statusCode support
├── middleware/
│   └── errorMiddleware.js   # Global 4-argument error-handling middleware
├── routes/
│   └── demoRoutes.js        # Demo routes (success, errors, async, 401, 404)
├── server.js                # Express app setup and server entry point
├── package.json
└── README.md
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

The server runs on **http://localhost:3000**.

---

## Available Routes

| Method | Route | Description | Expected Status |
|--------|-------|-------------|-----------------|
| GET | `/success` | Normal successful response | 200 |
| GET | `/error` | Generic thrown Error | 500 |
| GET | `/custom-error` | Custom AppError (Bad Request) | 400 |
| GET | `/async-error` | Async operation failure | 503 |
| GET | `/unauthorized` | Auth guard simulation | 401 |
| GET | `/*` | Any undefined route | 404 |

---

## Example Responses

### ✅ Success — `GET /success`

```json
{
  "success": true,
  "message": "Everything went smoothly!",
  "data": {
    "user": "demo-user",
    "timestamp": "2025-01-01T00:00:00.000Z"
  }
}
```

### ❌ Error — `GET /error`

```json
{
  "success": false,
  "statusCode": 500,
  "message": "Something went wrong"
}
```

### ❌ Custom Error — `GET /custom-error`

```json
{
  "success": false,
  "statusCode": 400,
  "message": "This is a custom 400 Bad Request error"
}
```

### ❌ 404 — `GET /unknown-route`

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Route not found: GET /unknown-route"
}
```

---

## How It Works

### 1. `AppError` — Custom Error Class (`errors/AppError.js`)

Extends the native `Error` class to attach a `statusCode` property and an `isOperational` flag (distinguishes expected errors from unexpected crashes).

```js
throw new AppError("Not authorized", 401);
```

### 2. Error Middleware (`middleware/errorMiddleware.js`)

Express recognises error-handling middleware by its **4-argument signature**: `(err, req, res, next)`. It must be registered **after all routes**.

It reads `err.statusCode` and `err.message`, then sends a standardised JSON response:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "..."
}
```

### 3. Route Error Forwarding

Inside any route, pass errors to the middleware with `next(err)`:

```js
router.get("/example", (req, res, next) => {
  next(new AppError("Something failed", 500));
});
```

For async routes, wrap in try/catch and call `next(err)` in the catch block.

### 4. 404 Fallback

Registered after all routes but before the error middleware:

```js
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
});
```

---

## Testing with Postman / Thunder Client

1. Open Postman or Thunder Client.
2. Set method to **GET**.
3. Try each URL:
   - `http://localhost:3000/success`
   - `http://localhost:3000/error`
   - `http://localhost:3000/custom-error`
   - `http://localhost:3000/async-error`
   - `http://localhost:3000/unauthorized`
   - `http://localhost:3000/nonexistent`

---

## Key Concepts Demonstrated

- ✅ Custom `AppError` class with `statusCode`
- ✅ Global error-handling middleware (4-argument signature)
- ✅ Middleware registered in correct order (routes → 404 → error handler)
- ✅ Standardised JSON error response format
- ✅ Async error propagation via `try/catch` + `next(err)`
- ✅ 404 fallback for undefined routes
- ✅ Stack trace included only in development mode
