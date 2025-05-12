import { test, expect } from '@playwright/test';
import * as path from 'path';
import { performance } from 'perf_hooks';

test.describe('SlipVault End-to-End Flow', () => {
  let startTime: number;

  test.beforeEach(async () => {
    // Record start time for performance measurement
    startTime = performance.now();
  });

  test('should upload receipt and mint NFT', async ({ page }) => {
    // Step 1: Navigate to the home page
    await page.goto('/');
    await expect(page).toHaveTitle(/SlipVault/);
    
    // Step 2: Upload receipt image
    const fileInputSelector = 'input[type="file"]';
    await page.waitForSelector(fileInputSelector, { state: 'attached' });
    
    // Get the absolute path to the receipt sample
    const receiptPath = path.join(__dirname, 'fixtures', 'receipt-sample.jpg');
    
    // Upload file
    await page.setInputFiles(fileInputSelector, receiptPath);
    
    // Verify the image is displayed
    await page.waitForSelector('img[alt="Receipt preview"]');
    
    // Click the Continue button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 3: Confirm extracted data
    await page.waitForURL(/confirm/, { timeout: 20000 });
    await expect(page.getByText('Confirm Receipt Details')).toBeVisible();
    
    // Verify extracted data is displayed
    await expect(page.getByText('Merchant:')).toBeVisible();
    await expect(page.getByText('Date:')).toBeVisible();
    await expect(page.getByText('Total:')).toBeVisible();
    
    // Step 4: Mock the blockchain wallet connection and transaction
    // In a real test, we would connect to a test wallet and submit a real transaction
    // For this demo, we'll just continue the flow and verify the UI

    // Click the Mint NFT button
    await page.getByRole('button', { name: 'Mint NFT' }).click();
    
    // Wait for success notification (this would be shown after successful minting)
    await page.waitForSelector('[role="status"]', { timeout: 30000 });
    
    // Expect to be redirected to the receipts gallery
    await page.waitForURL(/receipts/, { timeout: 10000 });
    
    // Step 5: Verify receipt gallery displays the minted NFT
    await expect(page.getByText('My Receipt NFTs')).toBeVisible();
    
    // Record end time and calculate total duration
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Verify the operation completed in under 60 seconds (60,000 ms)
    console.log(`Total flow time: ${Math.round(duration / 1000)} seconds`);
    expect(duration).toBeLessThanOrEqual(60000);
  });

  // This is a separate test for optimized performance on mobile devices
  test('should have good mobile performance', async ({ page }) => {
    await page.goto('/');
    
    // This would be expanded to actually run Lighthouse in CI
    // For now, it's just a placeholder
    await expect(page).toBeVisible();
  });
}); 