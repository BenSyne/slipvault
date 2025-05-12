'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import Link from 'next/link';

type ReceiptProps = {
  id: string;
  merchant: string;
  date: string;
  total: string;
  imageUrl: string;
  ipfsUri: string;
  hash: string;
};

export default function ReceiptCard({ receipt }: { receipt: ReceiptProps }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-4">
        <CardTitle className="text-lg truncate">{receipt.merchant}</CardTitle>
        <div className="text-sm text-gray-500">{receipt.date}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="relative w-full h-48 mb-4 overflow-hidden bg-gray-100 rounded-md">
          <img 
            src={receipt.imageUrl} 
            alt={`Receipt from ${receipt.merchant}`} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-2">
          <div className="font-medium">Total: {receipt.total}</div>
          <div className="flex items-center text-xs text-gray-500 truncate">
            <span className="truncate">{receipt.ipfsUri}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 truncate">
            <span className="truncate">{receipt.hash}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Link href={`/receipts/${receipt.id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </Link>
        <Button 
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => window.open(`https://ipfs.io/ipfs/${receipt.ipfsUri.replace('ipfs://', '')}`, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          IPFS
        </Button>
      </CardFooter>
    </Card>
  );
} 