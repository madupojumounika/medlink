# MedLink AI Backend

This is the official Node.js / Express backend for the MedLink AI healthcare platform. It is designed following strict enterprise software architecture patterns, focusing on modularity, security, and scalability.

---

## 🏗️ Architecture

The backend strictly enforces a layered architecture. Separation of concerns is maintained at all times to allow for easy integration with future database, AI, and socket implementations.

**Request Flow:**
`Routes` ➔ `Controllers` ➔ `Services` ➔ `Repository Interfaces` ➔ `Database`

1. **Routes:** Only responsible for defining endpoints and mapping them to controllers.
2. **Controllers:** Only responsible for receiving requests, validating input, passing data to services, and formatting the response. **No business logic exists here.**
3. **Services:** The core of the application. Contains all business logic, authorization rules, and external service orchestration.
4. **Repositories:** Abstraction layer for data access. Isolates the service layer from Mongoose implementations.

---

## ✅ Core Backend Infrastructure (Phase 2)

The backend has been fortified with reusable infrastructure to eliminate boilerplate code and ensure strict validation and error handling across all APIs.

### 1. Error Handling Engine
- **`ApiError.js`**: A custom Error class extending the native `Error` object. Services use this to throw operational errors predictably (e.g., `throw new ApiError(404, 'User not found')`).
- **`asyncHandler.js`**: A controller wrapper that eliminates the need for repetitive `try/catch` blocks. It automatically forwards any Promise rejections straight to the global error handler.
- **Global Error Handler**: Refactored to seamlessly intercept `ApiError` instances and normalize them into the standard `apiResponse` format, while automatically writing to the Logger.

### 2. Logging System (`src/utils/logger.js`)
- Integrated **Winston** for robust logging.
- Automatically switches formats based on the environment:
  - **Development**: Outputs colorized, human-readable strings to the console.
  - **Production**: Outputs structured JSON logs (making it incredibly easy to pipe logs into services like Datadog, ELK, or CloudWatch).

### 3. Validation Framework (`src/middleware/validate.js`)
- Integrated **express-validator**.
- Created a robust wrapper middleware (`validate.js`). When applied to a route, it executes all provided validation rules sequentially. If any rule fails, it automatically intercepts the request and returns a standardized `400 Bad Request` containing a map of the exact field errors, completely protecting the controllers from invalid data.
- **`regex.js`**: Centralized repository of standard Regular Expressions (Emails, Strong Passwords, UUIDs, Phone Numbers) used by the validation layer.

---

## ✅ Foundation Work Completed (Phase 1)

The base infrastructure has been set up with the following utilities, configurations, and core middleware:

### 1. Base Configuration (`src/config/`)
- **`env.js`**: Centralized environment variable management. Validates critical keys (`MONGODB_URI`, `JWT_SECRET`) on startup and crashes the server safely if they are missing.
- **`database.js`**: Standardized Mongoose connection management capable of handling disconnections and connection errors gracefully.

### 2. Express Server Setup (`src/app.js` & `src/server.js`)
- **ES Modules**: Fully configured to use native ES module imports (`import` / `export`).
- **Security Middlewares**: Integrated `helmet` (HTTP headers), `cors` (origin protection), and `express-rate-limit` (DDoS mitigation).
- **Request Parsing**: Includes JSON, URL-encoded parsing (with 10mb limits), and `cookie-parser`.
- **Optimization**: Implements `compression` for response payload reduction.
- **Logging**: Configured `morgan` for automated HTTP request logging.
- **Graceful Shutdown**: `server.js` traps `SIGTERM`, `SIGINT`, uncaught exceptions, and unhandled rejections to ensure the server shuts down cleanly without data loss.

### 3. API Response Standardization (`src/utils/`)
- **`apiResponse.js`**: A globally used utility function enforcing a strict JSON response contract. Every API response in this project will adhere to:
  ```json
  {
    "success": true,
    "message": "Operation successful",
    "data": { ... },
    "errors": null,
    "timestamp": "2026-07-19T12:00:00.000Z"
  }
  ```

### 4. Global Error Handling (`src/middleware/`)
- **`errorHandler.js`**: Catches all downstream errors and normalizes them into the standard `apiResponse` format. Only leaks stack traces when `NODE_ENV=development`.
- **`notFound.js`**: Intercepts 404 routes and returns a normalized standardized JSON 404 response.

### 5. Constants (`src/constants/`)
- **`statusCodes.js`**: Extracts HTTP status codes (200, 400, 401, 500, etc.) into readable variables to prevent magic numbers across the codebase.
- **`messages.js`**: Centralized text repository for standard system messages to ensure uniformity.

### 6. Health Endpoint (`src/routes/health.routes.js`)
- Implemented `GET /api/v1/health` for monitoring server uptime, runtime environment, and versioning.

---

## 🚫 Development Constraints

- **No Empty Scaffolding:** Files and folders are created *strictly* when needed. No unused placeholder files exist.
- **Database Rules:** No Mongoose Schemas or Models will be implemented during the initial backend development phase. The service layer will communicate with placeholder Repository interfaces.
- **AI Rules:** No Python, FastAPI, or ML logic will be developed here. Interfaces will be prepared to communicate with a completely separate AI service over REST APIs.
- **Code Quality:** All code is strictly DRY, completely tested, passes all ESLint rules, and utilizes proper Async/Await.
