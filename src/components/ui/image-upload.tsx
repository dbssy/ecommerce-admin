'use client';

import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface IImageUploadProps {
  disabled?: boolean;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export function ImageUpload({
  disabled,
  value,
  onChange,
  onRemove,
}: IImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onUpload(result: any) {
    onChange(result.info.secure_url);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value.map((url) => (
          <div
            key={url}
            className="w-[200px] h-[200px] rounded-mg overflow-hidden relative"
          >
            <div className="top-2 right-2 z-10 absolute">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <Image src={url} alt="Image" fill className="object-cover" />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="m4efkuqn">
        {({ open }) => {
          function onClick() {
            open();
          }

          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Enviar uma imagem
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
