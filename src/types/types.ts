// src/types/types.ts

export interface Token {
  id: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  feesUSD: string;
  txCount: string;
  poolCount: string;
}

export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  feeTier: string;
  liquidity: string;
  volumeUSD: string;
  token0Price: string;
  token1Price: string;
}
