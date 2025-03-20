// src/api/server.ts
import express, { RequestHandler } from 'express';
import { TokenAnalysisAgent } from '../services/tokenAnalysis.js';
import { WebSocketServer } from 'ws';
import http from 'http';

export async function startServer(port: number = 3000) {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });
  const agent = new TokenAnalysisAgent();
  //server

  app.use(express.json());

  // Regular HTTP
  const analyzeHandler: RequestHandler = async (req, res) => {
    try {
      const { query } = req.body;

      if (!query) {
        res.status(400).json({ error: 'Query is required' });
        return;
      }

      const analysis = await agent.processQuery(query);
      res.json({ analysis });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Failed to process query' });
    }
  };

  app.post('/analyze', analyzeHandler);

  // WebSocket connection handler
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('message', async (message) => {
      try {
        const userMessage = message.toString();
        console.log('Message::::::::', userMessage);

        if (!userMessage.trim()) {
          ws.send('Error: Message is required');
          return;
        }

        const assistant = await agent.processQuery(userMessage);
        ws.send(assistant);
      } catch (error) {
        console.error('WebSocket error:', error);
        ws.send('Error: Failed to process message');
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Start server
  server.listen(port, () => {
    console.log(`Token Analysis API server running on port ${port}`);
    console.log(`WebSocket server is running on ws://localhost:${port}`);
  });
}
