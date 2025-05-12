'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

const Dropzone = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: FileList | null) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDrop(e.target.files);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        // Send to extraction API
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: base64 }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to extract receipt data');
        }
        
        const data = await response.json();
        
        // Store data in session storage for the confirm page
        sessionStorage.setItem('receiptData', JSON.stringify(data));
        sessionStorage.setItem('receiptImage', base64);
        
        // Navigate to confirm page
        router.push('/confirm');
      };
    } catch (error) {
      console.error('Error uploading receipt:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!preview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500">Drag & drop a receipt image here, or click to select</p>
          <p className="text-xs text-gray-400 mt-2">Supports: JPEG, PNG</p>
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="w-full">
          <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
            <img 
              src={preview} 
              alt="Receipt preview" 
              className="object-contain w-full h-full"
            />
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            >
              ✕
            </button>
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dropzone; 