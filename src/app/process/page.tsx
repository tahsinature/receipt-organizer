"use client";

import ImageNext from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Exists = (imageSrc: string) => {
  const handleDone = () => {
    localStorage.removeItem("imageSrc");
  };

  return (
    <>
      processing
      <hr />
      <ImageNext src={imageSrc} alt="captured image" width={400} height={400} />
      <button onClick={handleDone}>
        <Link href="/">clear & start over</Link>
      </button>
    </>
  );
};

const NotExists = (errMsg: string) => {
  return (
    <div>
      <p>Error: {errMsg}</p>
      <button>
        <Link href="/">go root</Link>
      </button>
    </div>
  );
};

const getImageURL = () => {
  const src: string | null = localStorage.getItem("imageSrc");
  if (!src) return Promise.resolve(false);

  const img = new Image();
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(src);
    };
    img.onerror = () => {
      resolve(null);
    };

    img.src = src;
  });
};

const fetcher = (): Promise<string> => {
  const src: string | null = localStorage.getItem("imageSrc");
  if (!src) return Promise.reject("no image");

  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(src);
    };
    img.onerror = () => {
      reject("invalid image url");
    };

    img.src = src;
  });
};

const Process = () => {
  const { data, error, isLoading } = useSWR<string>("imageSrc", fetcher);

  return <div>{isLoading ? <p>Loading...</p> : data ? Exists(data) : NotExists(error)}</div>;
};

export default Process;
