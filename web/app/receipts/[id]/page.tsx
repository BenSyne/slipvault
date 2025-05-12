'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { hashData } from '@/lib/ipfs';

export default function ReceiptDetailsPage() {
  const params = useParams();
  const [receipt, setReceipt] = useState<any>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'verified' | 'failed'>('loading');

  useEffect(() => {
    // This is a placeholder implementation
    // In the real implementation, we would fetch the NFT data from the contract
    const mockReceipt = {
      id: params.id,
      merchant: 'Amazon',
      date: '2024-05-10',
      total: '$42.99',
      imageUrl: 'https://placehold.co/400x600/png',
      ipfsUri: 'ipfs://QmTest1',
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    };

    // Mock the receipt data that would be fetched from IPFS
    const mockReceiptData = {
      merchant: 'Amazon',
      date: '2024-05-10',
      items: [
        { name: 'Product 1', price: '$29.99' },
        { name: 'Product 2', price: '$12.99' }
      ],
      subtotal: '$42.98',
      tax: '$0.01',
      total: '$42.99'
    };

    // Simulate API fetch delay
    setTimeout(() => {
      setReceipt(mockReceipt);
      setReceiptData(mockReceiptData);
      setLoading(false);

      // Verify the hash
      verifyReceiptHash(mockReceiptData, mockReceipt.hash);
    }, 1000);
  }, [params.id]);

  // Function to verify the receipt hash
  const verifyReceiptHash = async (data: any, storedHash: string) => {
    try {
      const calculatedHash = await hashData(data);
      if (calculatedHash.toLowerCase() === storedHash.toLowerCase()) {
        setVerificationStatus('verified');
      } else {
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('Error verifying hash:', error);
      setVerificationStatus('failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Receipt Details</h1>
          <Link href="/receipts">
            <Button variant="outline">Back to Gallery</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Receipt Image</CardTitle>
                <Badge 
                  variant={verificationStatus === 'verified' ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  {verificationStatus === 'verified' ? (
                    <>
                      <CheckCircle className="h-3 w-3" /> Verified
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3" /> Unverified
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden h-96">
                <img 
                  src={receipt.imageUrl} 
                  alt={`Receipt from ${receipt.merchant}`} 
                  className="object-contain w-full h-full"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Date:</span> {receipt.date}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Total:</span> {receipt.total}
              </div>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Receipt Information</CardTitle>
                <CardDescription>Extracted from original receipt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">Merchant</h3>
                    <p>{receiptData.merchant}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Items</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {receiptData.items.map((item: any, idx: number) => (
                        <li key={idx}>
                          {item.name} - {item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Subtotal</h3>
                      <p>{receiptData.subtotal}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Tax</h3>
                      <p>{receiptData.tax}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Total</h3>
                    <p className="text-lg">{receiptData.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blockchain Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">IPFS URI</h3>
                    <code className="text-xs bg-gray-100 p-2 rounded block truncate">
                      {receipt.ipfsUri}
                    </code>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Data Hash</h3>
                    <code className="text-xs bg-gray-100 p-2 rounded block truncate">
                      {receipt.hash}
                    </code>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(`https://ipfs.io/ipfs/${receipt.ipfsUri.replace('ipfs://', '')}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on IPFS
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 