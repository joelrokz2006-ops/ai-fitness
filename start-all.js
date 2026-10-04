const { spawn } = require("child_process");
const path = require("path");

console.log("=================================");
console.log("🚀 Starting AI Fitness System...");
console.log("=================================");

// 1. Launch Backend (Port 5001)
const backend = spawn("node", ["server.js"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true,
});

backend.on("error", (err) => {
  console.error("❌ Backend process error:", err.message);
});

// 2. Launch Frontend (Port 5174)
const frontend = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  stdio: "inherit",
  shell: true,
});

frontend.on("error", (err) => {
  console.error("❌ Frontend process error:", err.message);
});

const cleanup = () => {
  console.log("\nShutting down AI Fitness processes...");
  backend.kill();
  frontend.kill();
  process.exit(0);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
