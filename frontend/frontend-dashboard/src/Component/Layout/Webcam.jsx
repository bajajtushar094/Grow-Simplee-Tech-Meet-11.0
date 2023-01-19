import React, { useState } from "react";
import Webcam from "react-webcam";
// https://www.npmjs.com/package/react-webcam

const WebcamCapture = () => {
  const [imgsrc, setImgsrc] = useState("");
  const videoConstraints = {
    width: 800,
    height: 500,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImgsrc(imageSrc);
  }, [webcamRef]);
  return (
    <div>
      <br />
      <div>
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={800}
          videoConstraints={videoConstraints}
          className="rounded-3xl"
        />
        <button
          onClick={() => {
            setItOn(0);
          }}
        >
          Stop webcam
        </button>
        <br />
        {/* click the button below to take a snapshot and then click on anchor tag to download the snapshot */}
        {/* it gets downloaded in downloads folder by default but download location can be changed */}
        <button onClick={capture}>Capture photo</button>
        <br />

        <a download="FILENAME.png" href={imgsrc}>
          link
        </a>
      </div>
    </div>
  );
};

export default WebcamCapture;
