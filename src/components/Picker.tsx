"use client";

import { UploadDropzone } from "@/src/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Picker() {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);

  if (typeof window !== "undefined") {
    const data = localStorage.getItem("data");
    if (data) router.push("/result");
  }

  if (error) throw error;

  return (
    <main className="flex flex-col items-center p-24 justify-center">
      <UploadDropzone
        config={{ mode: "auto", appendOnPaste: true }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const receiptData = res.map((r) => r.serverData);
          const { error, data } = receiptData[0];
          if (error) setError(new Error(error));
          else {
            localStorage.setItem("data", JSON.stringify(data));
            router.push("/result");
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
