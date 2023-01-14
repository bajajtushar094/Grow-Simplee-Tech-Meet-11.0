import React, { useState } from "react";
import Webcam from "react-webcam";
// https://www.npmjs.com/package/react-webcam

const WebcamCapture = () => {
  const [imgsrc, setImgsrc] = useState("");
  const [isItOn, setItOn] = useState(0); // usestate variable to check if webcam is on
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImgsrc(imageSrc);
  }, [webcamRef]);
  return (
    <>
      {isItOn === 1 ? (
        <>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button
            onClick={() => {
              setItOn(0);
            }}
          >
            Stop webcam
          </button>
          {/* click the button below to take a snapshot and then click on anchor tag to download the snapshot */}
          {/* it gets downloaded in downloads folder by default but download location can be changed */}
          <button onClick={capture}>Capture photo</button>
          <a download="FILENAME.png" href={imgsrc}>
            link
          </a>
        </>
      ) : (
        <button
          onClick={() => {
            setItOn(1);
          }}
        >
          Start webcam
        </button>
      )}
    </>
  );
};

export default WebcamCapture;
