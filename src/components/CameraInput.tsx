"use client";

import Camera from "@/components/Camera";
import { useRouter } from "next/navigation";

const CameraInput = () => {
  const router = useRouter();
  const handleCapture = (imageSrc: string) => {
    localStorage.setItem("imageSrc", imageSrc);
    router.push(`/process`);
  };

  return <Camera onCapture={handleCapture} />;
};

export default CameraInput;
