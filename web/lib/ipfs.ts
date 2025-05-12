'use client';

import { NFTStorage, File } from 'nft.storage';

// Function to pin data to IPFS
export async function pinToIPFS(data: any, image: string) {
  if (!process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN) {
    throw new Error('NFT.Storage token is not configured');
  }

  try {
    const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN });
    
    // Convert base64 image to File object
    const imageFile = base64ToFile(image, 'receipt.jpg');
    
    // Convert JSON data to Blob
    const dataBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    
    // Store data
    const cid = await client.storeBlob(dataBlob);
    
    // Store image separately for display
    const imageCid = await client.storeBlob(imageFile);
    
    // Create hash of the data
    const hash = await hashData(data);
    
    return { 
      dataCid: cid, 
      imageCid: imageCid,
      hash 
    };
  } catch (error) {
    console.error('Error pinning to IPFS:', error);
    throw error;
  }
}

// Function to convert base64 to File
function base64ToFile(base64: string, filename: string): File {
  // Get the base64 data (remove data URL prefix if present)
  const base64Data = base64.split(',')[1] || base64;
  
  // Convert base64 to binary
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Create File object
  return new File([bytes], filename, { type: 'image/jpeg' });
}

// Function to hash data using SHA-256
export async function hashData(data: any): Promise<string> {
  try {
    // Convert data to JSON string
    const jsonString = JSON.stringify(data);
    
    // Encode as UTF-8
    const encoder = new TextEncoder();
    const encoded = encoder.encode(jsonString);
    
    // Hash using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    
    // Convert to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return `0x${hashHex}`;
  } catch (error) {
    console.error('Error creating hash:', error);
    throw error;
  }
} 