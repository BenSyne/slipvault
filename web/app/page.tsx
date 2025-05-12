import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Dropzone from "@/components/Dropzone";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p className="flex h-8 items-center justify-center border border-b-0 bg-background p-6 font-mono text-xs">
            SlipVault v1.0
          </p>
        </div>
        <div className="fixed bottom-0 left-0 flex w-full justify-center space-x-4 border-t border-gray-300 bg-gradient-to-b from-background pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-black dark:from-black lg:static lg:w-auto lg:bg-none">
          <Link href="/receipts">
            <Button variant="outline">View My Receipts</Button>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Receipt</CardTitle>
            <CardDescription>
              Upload a purchase receipt to generate an NFT proof of purchase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dropzone />
          </CardContent>
        </Card>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Upload &rarr;
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Upload your receipt image in JPEG or PNG format.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Verify &rarr;
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            We extract and verify your receipt data.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4">
          <h2 className="mb-3 text-2xl font-semibold">
            Mint NFT &rarr;
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Receive an NFT with your receipt data secured on-chain.
          </p>
        </div>
      </div>
    </main>
  );
} 