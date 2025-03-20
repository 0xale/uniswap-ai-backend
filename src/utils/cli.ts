// src/utils/cli.ts
import { createInterface } from 'readline';
import { TokenAnalysisAgent } from '../services/tokenAnalysis.js';

export async function runCLI(): Promise<void> {
  const agent = new TokenAnalysisAgent();

  console.log('Welcome to the Uniswap Token Analysis Agent!');
  console.log('Enter your query or type "exit" to quit.');
  console.log('Example queries:');
  console.log('- "Get details of the USDC/ETH pool on Uniswap V3."');
  console.log('- "Show the price of ETH/USDC over the last 7 days."');
  console.log('- "What are the most actively traded pools?"');

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    readline.question('\nQuery: ', async (query: string) => {
      if (query.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        readline.close();
        return;
      }

      console.log('\nProcessing your query...');
      try {
        const analysis = await agent.processQuery(query);
        console.log('\n' + analysis);
      } catch (error) {
        console.error('Error:', error);
      }

      askQuestion();
    });
  };

  askQuestion();
}
