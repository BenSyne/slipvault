import { z } from 'zod';

// Define the item schema
const ReceiptItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  price: z.string().min(1, 'Item price is required')
});

// Define the receipt schema
export const ReceiptSchema = z.object({
  merchant: z.string().min(1, 'Merchant name is required'),
  date: z.string().min(1, 'Date is required'),
  items: z.array(ReceiptItemSchema).min(1, 'At least one item is required'),
  subtotal: z.string().optional(),
  tax: z.string().optional(),
  total: z.string().min(1, 'Total amount is required'),
  warranty: z.string().optional()
});

// Export type
export type ReceiptData = z.infer<typeof ReceiptSchema>;

// Validation function
export function validateReceiptData(data: unknown) {
  const result = ReceiptSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error.format() };
  }
} 