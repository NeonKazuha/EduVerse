import React from "react";
import { Html } from "@react-three/drei";

const MusicIframe = () => {
  return (
    <Html
      position={      [57.02754076507434, 3, -30.714341294725028 ]
      }
      rotation={[0, -Math.PI/2, 0]} 
      transform
      scale={0.8}
      occlude={"blending"}
      zIndexRange={[10, 1]}
    >
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with desired YouTube video URL
        frameBorder="5"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Html>
  );
};

export default MusicIframe;
