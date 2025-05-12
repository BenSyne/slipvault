'use client';

import { writeContract } from 'wagmi/actions';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { pinToIPFS } from './ipfs';

// Import contract ABI and addresses from a JSON file
const contractsJson = {
  SlipVaultToken: '0x...',  // This will be replaced with the actual deployed address
  network: 'base_sepolia'
};

const SlipVaultABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "dataHash",
        "type": "bytes32"
      }
    ],
    "name": "mintReceipt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Set up the chain based on the network
const getChain = () => {
  return contractsJson.network === 'base_mainnet' ? base : baseSepolia;
};

export async function mintReceipt(receiptData: any, receiptImage: string, walletClient: any) {
  try {
    // 1. Pin the data to IPFS
    const { dataCid, hash } = await pinToIPFS(receiptData, receiptImage);
    
    // 2. Format the URI
    const uri = `ipfs://${dataCid}`;
    
    // 3. Convert hex hash to bytes32
    const hashBytes32 = hash;
    
    // 4. Mint the NFT
    const hash2 = await writeContract(walletClient, {
      address: contractsJson.SlipVaultToken as `0x${string}`,
      abi: SlipVaultABI,
      functionName: 'mintReceipt',
      args: [walletClient.account.address, uri, hashBytes32]
    });
    
    return {
      success: true,
      txHash: hash2,
      uri: uri,
      hash: hashBytes32
    };
  } catch (error) {
    console.error('Error minting receipt NFT:', error);
    return {
      success: false,
      error: error
    };
  }
}

// Function to create a public client for reading from the blockchain
export function createClient() {
  const chain = getChain();
  return createPublicClient({
    chain,
    transport: http()
  });
} 