import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const VideoCapture  = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null); // Ref for video element
  const streamRef = useRef(null); // Ref for stream object

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraActive(true);
      streamRef.current = stream; // Store the stream in a ref
      if (videoRef.current) {
        // Set video source
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  
  const stopCamera = () => {
    if (isCameraActive) {
      const stream = streamRef.current;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        // Remove srcObject from video element
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    }
  };

  const handleButtonClick = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Explicitly stop camera
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="camera-container flex flex-col items-center gap-5">
      {isCameraActive && (
        <Webcam audio={false} width={320} height={240} ref={videoRef} />
      )}
      <button onClick={handleButtonClick} className="text-lg max-w-fit bg-violet-600 font-semibold p-2 rounded-full ">
        {isCameraActive ? "Stop Camera" : "Start Camera"}
      </button>
      {/* Flipping the video container to correct the default inversion of the incoming video */}

      <style>{`
        .camera-container video {
          transform: scaleX(-1); 
        }
      `}</style>
    </div>
  );
};

export default VideoCapture ;
