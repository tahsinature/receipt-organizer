"use client";

import { useRouter } from "next/navigation";
import { Braces as ShowDataIcon } from "lucide-react";
import { SiNotion, SiFirefox } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { safeParse } from "@/app/common/utils/json";
import CodeDrawer from "@/components/CodeDrawer";
import Clear from "@/app/result/Clear";
import Link from "next/link";
import Image from "next/image";

const Result = () => {
  const router = useRouter();
  const [data, setData] = useState<null | any>(null);
  const [isOpen, setIsOpen] = useState<null | any>(null);

  useEffect(() => {
    const localData = localStorage.getItem("data");

    if (!localData) router.push("/");
    else setData(safeParse(localData));
  }, [router]);

  if (!data) return <div>Loading...</div>;

  const { notionURL, imageURL, fileKey } = data;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <CodeDrawer code={data} isOpen={isOpen} onOpenChange={setIsOpen} />

      <div>
        <div className="w-[200px] rounded overflow-hidden select-none">
          {/* <ResizedImage imageSrc={imageURL} maxFileSize={4 * 1024 * 1024} /> */}
          <Image src={imageURL} width={2000} height={2000} alt="Resized Receipt Image" />
          <p>{data.notionID}</p>
        </div>
      </div>

      <div className="flex flex-row mt-5 gap-2 flex-wrap justify-center">
        <Link target="_blank" href={notionURL}>
          <Button>
            <SiFirefox className="mr-2" />
            Notion Browser
          </Button>
        </Link>
        <Link target="_blank" href={notionURL.replace("https", "notion")}>
          <Button>
            <SiNotion className="mr-2" /> Notion App
          </Button>
        </Link>

        <Button onClick={() => setIsOpen(true)} size={"icon"}>
          <ShowDataIcon />
        </Button>
        <Clear fileKey={fileKey} />
      </div>
    </div>
  );
};

export default Result;
