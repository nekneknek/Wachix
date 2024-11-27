import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface HeroEditorProps {
  currentImage: string;
  onImageUpdate: (newImage: string) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ currentImage, onImageUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  };

  const processImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Définir les dimensions optimales
        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth * height) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (maxHeight * width) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        
        // Dessiner l'image redimensionnée
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convertir en format WebP avec compression
        const optimizedImage = canvas.toDataURL('image/webp', 0.8);
        setPreview(optimizedImage);
        onImageUpdate(optimizedImage);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Image Hero</h3>
      
      <div className="space-y-4">
        {/* Prévisualisation */}
        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
          {preview ? (
            <img
              src={preview}
              alt="Hero preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Zone de drop */}
        <div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragging ? 'border-gold-500 bg-gold-50' : 'border-gray-300 hover:border-gold-500'}`}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            Glissez-déposez une image ici ou
          </p>
          <label className="inline-block">
            <span className="bg-gold-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gold-600 transition-colors">
              Parcourir
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
          </label>
        </div>

        <div className="text-sm text-gray-500">
          <p>Format recommandé : 1920x1080px</p>
          <p>Taille maximale : 5MB</p>
          <p>Formats acceptés : JPG, PNG, WebP</p>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;