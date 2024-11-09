import React from 'react';
import { Html } from '@react-three/drei';

const Presentationiframe = () => {
    return (
        <Html transform occlude={'blending'} zIndexRange={[10, 1]} position={[+98.65, 3.7, +7.266]} rotation-y={Math.PI}
            scale={0.5}  >
            <iframe width={"474px"} height={"250vh"} src="https://invidious.io/" frameborder="5" />

        </Html>
    );
};

export default Presentationiframe;
