import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

process.on("uncaughtException", (err) => {
  console.error("[Uncaught Exception]: Shutting down application...");
  console.error(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      console.log(`Backend running successfully on port ${env.PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("[Unhandled Rejection]: Shutting down application...");
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    const gracefulShutdown = () => {
      console.log("[Shutdown]: Received shutdown signal, closing server...");
      server.close(() => {
        console.log("[Shutdown]: HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("[Server Error]: Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
