// src/index.ts
import dotenv from 'dotenv';
import { runCLI } from './utils/cli.js';
import { startServer } from './api/server.js'; // Add .js extension

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'cli';

  if (mode === 'server') {
    const port = parseInt(args[1]) || 3000;
    console.log('Starting server on port:', port);
    await startServer(port);
  } else if (mode === 'cli') {
    await runCLI();
  } else {
    console.error('Unknown mode. Use "cli" or "server".');
  }
}

main().catch(console.error);
