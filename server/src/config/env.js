import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

const requiredVariables = ["JWT_SECRET"];

for (const variable of requiredVariables) {
  if (!env[variable]) {
    console.error(`[Error]: Environment variable ${variable} is missing!`);
    process.exit(1);
  }
}
