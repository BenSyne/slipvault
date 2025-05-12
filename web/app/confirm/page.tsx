'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type ReceiptData = {
  merchant: string;
  date: string;
  items: Array<{ name: string; price: string }>;
  subtotal?: string;
  tax?: string;
  total: string;
};

export default function ConfirmPage() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load data from session storage
    const storedData = sessionStorage.getItem('receiptData');
    const storedImage = sessionStorage.getItem('receiptImage');

    if (!storedData || !storedImage) {
      router.push('/');
      return;
    }

    try {
      setReceiptData(JSON.parse(storedData));
      setReceiptImage(storedImage);
    } catch (error) {
      console.error('Error parsing receipt data:', error);
      router.push('/');
    }
  }, [router]);

  const handleMint = async () => {
    if (!receiptData || !receiptImage) return;

    setLoading(true);
    try {
      // Call IPFS storage and minting functions here
      // This will be implemented in the next steps

      // This is a placeholder
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Receipt NFT minted successfully!');
      router.push('/receipts');
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT. Please try again.');
      setLoading(false);
    }
  };

  if (!receiptData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <div className="max-w-2xl w-full">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Confirm Receipt Details</CardTitle>
            <CardDescription>
              Review the extracted details from your receipt before minting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Receipt Image</h3>
                <div className="border rounded-lg overflow-hidden h-64">
                  {receiptImage && (
                    <img 
                      src={receiptImage} 
                      alt="Receipt" 
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Extracted Data</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Merchant:</span> {receiptData.merchant}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span> {receiptData.date}
                  </div>
                  <div>
                    <span className="font-semibold">Items:</span>
                    <ul className="ml-4 mt-1 list-disc">
                      {receiptData.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} - {item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {receiptData.subtotal && (
                    <div>
                      <span className="font-semibold">Subtotal:</span> {receiptData.subtotal}
                    </div>
                  )}
                  {receiptData.tax && (
                    <div>
                      <span className="font-semibold">Tax:</span> {receiptData.tax}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Total:</span> {receiptData.total}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push('/')}>
              Back
            </Button>
            <Button onClick={handleMint} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting...
                </>
              ) : (
                'Mint NFT'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
} 