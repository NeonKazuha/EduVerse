import React from "react";
import { Html } from "@react-three/drei";

const RankBoard = () => {
  return (
    <Html
      position={[37.02754076507434, 3, -39.714341294725028]}
      rotation={[0, 0, 0]}
      scale={0.4}
      transform
      occlude={"blending"}
      zIndexRange={[10, 1]}
    >
      <iframe
        width="800"
        height="600"
        src="https://news360.tv/en/" // Replace with your preferred news website URL
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Html>
  );
};

export default RankBoard;