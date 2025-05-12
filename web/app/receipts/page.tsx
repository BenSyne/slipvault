'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import ReceiptCard from '@/components/ReceiptCard';

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder implementation
    // In the real implementation, we would fetch the user's NFTs from the contract
    const mockReceipts = [
      {
        id: '1',
        merchant: 'Amazon',
        date: '2024-05-10',
        total: '$42.99',
        imageUrl: 'https://placehold.co/200x300/png',
        ipfsUri: 'ipfs://QmTest1',
        hash: '0x1234567890abcdef'
      },
      {
        id: '2',
        merchant: 'Target',
        date: '2024-05-08',
        total: '$87.45',
        imageUrl: 'https://placehold.co/200x300/png',
        ipfsUri: 'ipfs://QmTest2',
        hash: '0xabcdef1234567890'
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setReceipts(mockReceipts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Receipt NFTs</h1>
          <Link href="/">
            <Button variant="outline">Upload New Receipt</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : receipts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-center text-gray-500 mb-4">
                You don&apos;t have any receipt NFTs yet.
              </p>
              <Link href="/">
                <Button>Upload Your First Receipt</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 