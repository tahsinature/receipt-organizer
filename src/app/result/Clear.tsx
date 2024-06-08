"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const Clear = ({ fileKey }: { fileKey: string }) => {
  const router = useRouter();

  const handleClear = async (fileKey: string) => {
    if (fileKey) {
      console.log(`deleting file with key: ${fileKey}`);
      const res = await fetch("/api/uploadthing", { body: JSON.stringify({ fileKey }), method: "DELETE" });
      console.log(await res.json());
    }

    localStorage.removeItem("data");
    router.push("/");
  };

  return (
    <Button variant={"destructive"} onClick={() => handleClear(fileKey)} size={"icon"}>
      <Trash2 />
    </Button>
  );
};

export default Clear;
