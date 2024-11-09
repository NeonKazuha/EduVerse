import { useFBX, useGLTF } from '@react-three/drei'
import React, { Suspense } from 'react'
import { MeshNormalMaterial, PlaneGeometry } from 'three';
import BannerWall from './BannerWall';
import File from '../Component/File';

const Office = () => {
    const OfficeModel = useFBX("./models/OnlyTables2.fbx");

    const room = useGLTF('./models/modern_office.glb');
    const stand = useGLTF('./models/screen_stand.glb');
    return (<Suspense><group position-x={62} position-z={-33}
    >
        <mesh castShadow position-x={60}


            scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh scale={80} rotation-x={Math.PI / 2} position={[-100, 13, 25]} >
            <planeGeometry />
            <meshStandardMaterial color="black" side={2} />


        </mesh>
        <primitive object={stand.scene} scale={2} />
        <primitive scale={0.025} rotation-y={Math.PI / 2} position={[-61, -1, 20]} object={OfficeModel} />
        <primitive scale={3} position={[-90, 3.4, 7]} object={room.scene} rotation-y={0} />
        <primitive object={stand.scene} scale={0.0025} position={[-60, -1, 15]} rotation-y={Math.PI / 2} />
        <File />
        <BannerWall />
    </group>
    </Suspense >
    )
}

export default Office