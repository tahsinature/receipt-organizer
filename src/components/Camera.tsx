"use client";

import { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  // facingMode: { exact: "environment" },
  // facingMode: { exact: "environment" },
};

type CameraProps = {
  onCapture: (imageSrc: string) => void;
};

const Camera = (props: CameraProps) => {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = (webcamRef.current as any).getScreenshot();
    props.onCapture(imageSrc);
  }, [webcamRef, props]);

  return (
    <div>
      <Webcam videoConstraints={videoConstraints} ref={webcamRef} screenshotQuality={1} />
      <button onClick={capture}>Capture</button>
    </div>
  );
};

export default Camera;
