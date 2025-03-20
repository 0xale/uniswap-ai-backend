import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3000");

ws.on("open", () => {
  console.log("Connected to server");

  // Send a test query
  const message = {
    query: "Get top 10 tokens by market cap",
  };

  ws.send(JSON.stringify(message));
});

ws.on("message", (data) => {
  const response = JSON.parse(data.toString());
  console.log("Received:", response);
});

ws.on("close", () => {
  console.log("Disconnected from server");
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});
