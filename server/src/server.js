import http from "http";
import dns from "node:dns";
import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { connectDB } from "./config/db.js";
import { aiService } from "./services/ai.service.js";

// Set DNS servers to Google and Cloudflare to resolve MongoDB Atlas SRV records in cloud environments (Render)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("[DNS]: Unable to set custom DNS servers", e.message);
}

process.on("uncaughtException", (err) => {
  console.error("[Uncaught Exception]: Shutting down application...");
  console.error(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      console.log(`Backend running successfully on port ${env.PORT}`);
      
      // Perform AI health check asynchronously
      aiService.checkAIHealth().then((isHealthy) => {
        if (isHealthy) {
          console.log("[AI_STATUS] AI Service is successfully connected and healthy.");
        } else {
          console.warn("[AI_STATUS] AI Service health check failed on startup.");
        }
      });
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
