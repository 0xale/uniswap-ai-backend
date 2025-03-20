// src/api/graphql.ts
import type { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();

// Configure environment variables
const API_KEY = process.env.API_KEY || "";
// const UNISWAP_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/GZWDNw5b7XH2iqnmG91FLDDkfEVEDQotfPv4GMdraEKY`;

// const UNISWAP_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1`;
const UNISWAP_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;

let graphQLClient: GraphQLClient;

// Initialize client using dynamic import
async function initializeClient() {
  const { GraphQLClient } = await import("graphql-request");
  graphQLClient = new GraphQLClient(UNISWAP_API_URL);
}

// Initialize immediately
initializeClient();

export { graphQLClient };
export async function executeGraphQLQuery(
  query: string,
  variables?: any
): Promise<any> {
  if (!graphQLClient) await initializeClient();
  try {
    console.log("Query::::::::", query);
    console.log("Variables::::::::", variables);
    const response = await graphQLClient.request(query, variables);
    console.log("response::::::::", response);
    return response;
  } catch (error) {
    console.error("Error executing GraphQL query:", error);
    throw new Error("Failed to execute GraphQL query. Please try again later.");
  }
}
