import React from 'react';
import { useControls } from 'leva';
import { useGLTF } from '@react-three/drei';

const models = {
    car: 'models/Car1.glb',
    sheenchair: 'models/sheenchair.glb',
};

export const ModSimulator = () => {
    const { selectedModel, scale, positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = useControls('Model Simulator', {
        selectedModel: {
            value: 'car',
            options: Object.keys(models),
            label: 'Select Model',
        },
        scale: {
            value: 0.5,
            min: 0.1,
            max: 2,
            step: 0.1,
        },
        positionX: {
            value: 69.09446812858943,
            min: -100,
            max: 100,
            step: 0.1,
        },
        positionY: {
            value: -0.9,
            min: -100,
            max: 100,
            step: 0.1,
        },
        positionZ: {
            value: 69.54155750089913,
            min: -100,
            max: 100,
            step: 0.1,
        },
        rotationX: {
            value: 0,
            min: 0,
            max: Math.PI * 2,
            step: 0.01,
        },
        rotationY: {
            value: 0,
            min: 0,
            max: Math.PI * 2,
            step: 0.01,
        },
        rotationZ: {
            value: 0,
            min: 0,
            max: Math.PI * 2,
            step: 0.01,
        },
    });

    const { scene } = useGLTF(models[selectedModel]);

    return (
        <primitive
            object={scene}
            position={[positionX, positionY, positionZ]}
            scale={scale}
            rotation={[rotationX, rotationY, rotationZ]}
        />
    );
};