import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export function LowPoly(props) {
    const groupRef = useRef();

    const { nodes, materials } = useGLTF('./models/squid_game_low_poly_character_unlit.glb')

    useFrame(() => {


        groupRef.current.position.x = props.position[0];
        groupRef.current.position.y = props.position[1];
        groupRef.current.position.z = props.position[2];

        groupRef.current.rotation.y = props.rot;
    })
    ////console.log("low poly loaded!!!!!!!!!!")
    return (
        <group {...props} scale={0.15} dispose={null}>
            <group scale={0.15} ref={groupRef}  >
                <mesh

                    geometry={nodes.squid_circle_gradient_0.geometry}
                    material={materials.gradient}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={19.864}
                />
            </group>
        </group>
    )
}

useGLTF.preload('./models/squid_game_low_poly_character_unlit.glb')
