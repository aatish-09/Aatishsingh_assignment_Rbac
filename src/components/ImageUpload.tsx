import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageSelected: (imageData: string) => void;
}

export function ImageUpload({ currentImage, onImageSelected }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <label
          htmlFor="photo-upload"
          className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Upload className="h-4 w-4" />
        </label>
      </div>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Click to upload profile photo
      </p>
    </div>
  );
}