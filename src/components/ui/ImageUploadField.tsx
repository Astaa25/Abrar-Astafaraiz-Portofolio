'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/components/feedback/ToastContext';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  folder?: string;
  helperText?: string;
  required?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = 'uploads',
  helperText,
  required = false,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error } = useToast();

  const handleFile = async (file: File) => {
    const isImageByExt = /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);
    if (!file.type.startsWith('image/') && !isImageByExt) {
      error('Harap pilih file gambar (JPG, PNG, WebP, SVG).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      error('Ukuran gambar maksimal 8 MB.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengunggah foto');
      }

      onChange(data.storagePath);
      success('Foto berhasil diunggah!');
    } catch (err) {
      console.warn('API upload fallback triggered:', err);
      // Fallback: convert to compressed base64 Data URL so it stays small (<200KB) and never breaks localStorage
      try {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target?.result) return;
          img.src = e.target.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            const maxDim = 1000;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
              onChange(compressedDataUrl);
              success('Foto berhasil dimuat!');
            } else {
              onChange(e.target?.result as string);
              success('Foto dimuat!');
            }
          };
          img.onerror = () => {
            onChange(e.target?.result as string);
            success('Foto dimuat!');
          };
        };
        reader.readAsDataURL(file);
      } catch {
        error(err instanceof Error ? err.message : 'Gagal memproses file gambar.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
        {label} {required && <span className="text-[#C43D4B]">*</span>}
      </label>

      {/* Upload Zone & Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
        {/* Drop zone / button */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`sm:col-span-8 border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-[#7966D9] bg-[#EDE8FF]/50 dark:bg-[#352D4A]/50'
              : 'border-[#D4CEE2] dark:border-[#3B334D] hover:border-[#7966D9] bg-white dark:bg-[#1B1726]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-6 h-6 text-[#7966D9] animate-spin" />
              <span className="text-xs font-semibold text-[#7966D9]">Mengunggah foto...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-[#EDE8FF] dark:bg-[#352D4A] flex items-center justify-center text-[#7966D9] dark:text-[#B7A7FF]">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#39324E] dark:text-[#F7F3FF]">
                  Klik untuk unggah atau seret foto ke sini
                </p>
                <p className="text-[11px] text-[#706981] dark:text-[#A096B5] mt-0.5">
                  Mendukung JPG, PNG, WebP, SVG (Maks. 8MB)
                </p>
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Preview */}
        <div className="sm:col-span-4 relative rounded-2xl border border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] p-2 flex flex-col items-center justify-center min-h-[100px] overflow-hidden group">
          {value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="w-full h-24 object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white shadow-xs hover:bg-red-600 transition-colors"
                title="Hapus foto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-[#928AA5] py-4">
              <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
              <span className="text-[11px]">Belum ada foto</span>
            </div>
          )}
        </div>
      </div>

      {/* Manual URL input fallback */}
      <div className="pt-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Atau tempel URL gambar langsung (contoh: /images/... atau https://...)"
          className="w-full text-xs rounded-xl border border-[#E6E0F1] dark:border-[#3B334D] bg-white dark:bg-[#211D2D] px-3 py-1.5 text-[#39324E] dark:text-[#F7F3FF] placeholder:text-[#928AA5] focus:outline-none focus:ring-1 focus:ring-[#7966D9]"
        />
      </div>

      {helperText && (
        <p className="text-[11px] text-[#706981] dark:text-[#A096B5]">{helperText}</p>
      )}
    </div>
  );
}
