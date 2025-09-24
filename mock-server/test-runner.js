import fetch from "node-fetch";
import { spawn } from "child_process";

const server = spawn("node", ["mock-server/index.js"], { stdio: "inherit" });

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  try {
    console.log("Waiting for server to start...");
    await wait(1200);
    const metrics = await fetch("http://localhost:3333/api/metrics").then((r) =>
      r.json()
    );
    if (!metrics?.success) throw new Error("metrics endpoint failed");
    const payments = await fetch("http://localhost:3333/api/payments").then(
      (r) => r.json()
    );
    if (!payments?.success) throw new Error("payments endpoint failed");
    console.log("Smoke tests passed");
    process.exit(0);
  } catch (err) {
    console.error("Smoke tests failed", err);
    process.exit(2);
  } finally {
    server.kill();
  }
}

run();
