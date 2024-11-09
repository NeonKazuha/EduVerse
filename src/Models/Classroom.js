import React from 'react'
import { useFBX, useGLTF } from '@react-three/drei';
const Classroom = () => {
    const classroom = useGLTF("./models/ClassroomEdited.glb");



    return (<>
        <primitive position={[70, -1.4, 0]} rotation-y={3 * (Math.PI / 2)} object={classroom.scene} scale={2} />

    </>
    )
}

export default Classroom