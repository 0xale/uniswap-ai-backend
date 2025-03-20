// src/api/graphql.ts
import { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();

// Configure environment variables
const API_KEY = "c703cfadd48c00d95607f10cd8af2524";
// const UNISWAP_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/GZWDNw5b7XH2iqnmG91FLDDkfEVEDQotfPv4GMdraEKY`;

// const UNISWAP_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1`;
const UNISWAP_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;

// Initialize GraphQL client
export const graphQLClient = new GraphQLClient(UNISWAP_API_URL);

/**
 * Execute a dynamically generated GraphQL query.
 * @param query - The GraphQL query string.
 * @param variables - Optional variables for the query.
 * @returns The response data.
 */
export async function executeGraphQLQuery(
  query: string,
  variables?: any
): Promise<any> {
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
