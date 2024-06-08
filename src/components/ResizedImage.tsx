"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Compressor from "compressorjs";

type ImageResizerProps = {
  imageSrc: string;
  maxFileSize: number;
};

const ImageResizer = ({ imageSrc, maxFileSize }: ImageResizerProps) => {
  const [resizedImage, setResizedImage] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    const resizeImage = async () => {
      if (!imageSrc) return;

      // Convert image source to File object
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      // Check if the file size exceeds maxFileSize
      if (file.size <= maxFileSize) {
        setResizedImage(imageSrc);
        return;
      }

      // Compress the image & convert to png
      new Compressor(file, {
        quality: 0.8, // Adjust the quality as needed
        mimeType: "image/png",
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => setResizedImage(reader.result);
        },
        error: (err) => console.error(err.message),
      });
    };

    resizeImage();
  }, [imageSrc, maxFileSize]);

  if (!(resizedImage && typeof resizedImage === "string")) return <p>Loading...</p>;

  return <Image src={imageSrc} priority width={2000} height={2000} alt="Resized Receipt Image" />;
};

export default ImageResizer;
