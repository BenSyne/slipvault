const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a canvas with receipt-like dimensions
const width = 400;
const height = 700;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fill with white background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);

// Set up text properties
ctx.fillStyle = 'black';
ctx.font = '14px Arial';
ctx.textAlign = 'left';

// Draw receipt content
ctx.font = 'bold 16px Arial';
ctx.textAlign = 'center';
ctx.fillText('SAMPLE RECEIPT', width / 2, 30);
ctx.fillText('---------------------------------------', width / 2, 50);

ctx.font = '14px Arial';
ctx.textAlign = 'left';
ctx.fillText('Store: SlipVault Test Store', 30, 80);
ctx.fillText('Date: 2024-06-01 15:30:45', 30, 110);
ctx.fillText('Transaction #: 123456789', 30, 140);

ctx.fillText('---------------------------------------', width / 2, 170);
ctx.fillText('ITEMS', 30, 200);
ctx.fillText('---------------------------------------', width / 2, 220);

ctx.fillText('1x Digital Product A', 30, 250);
ctx.fillText('$15.99', 350, 250);

ctx.fillText('1x Digital Product B', 30, 280);
ctx.fillText('$24.50', 350, 280);

ctx.fillText('1x Extra Service', 30, 310);
ctx.fillText('$5.00', 350, 310);

ctx.fillText('---------------------------------------', width / 2, 340);

ctx.fillText('Subtotal:', 250, 370);
ctx.fillText('$45.49', 350, 370);

ctx.fillText('Tax (8.25%):', 250, 400);
ctx.fillText('$3.75', 350, 400);

ctx.font = 'bold 16px Arial';
ctx.fillText('TOTAL:', 250, 440);
ctx.fillText('$49.24', 350, 440);

ctx.font = '14px Arial';
ctx.fillText('---------------------------------------', width / 2, 470);

ctx.fillText('Payment Method: Credit Card', 30, 500);
ctx.fillText('Card ending in: ****1234', 30, 530);

ctx.fillText('---------------------------------------', width / 2, 560);
ctx.textAlign = 'center';
ctx.fillText('Thank you for your purchase!', width / 2, 590);
ctx.fillText('www.slipvault.test', width / 2, 620);

// Create the fixtures directory if it doesn't exist
const fixturesDir = './e2e/fixtures';
if (!fs.existsSync(fixturesDir)) {
  fs.mkdirSync(fixturesDir, { recursive: true });
}

// Save the image
const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync('./e2e/fixtures/receipt-sample.jpg', buffer);

console.log('Sample receipt image created at: e2e/fixtures/receipt-sample.jpg'); 