import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'
import TheatreStage from './TheatreStage'

const Cinema = () => {

    const cinema = useGLTF('./models/Cinema3.glb    ')

    // const cinemaEntrance = useFBX('./models/CinemaEnterancec.fbx')


    return (<>

        <primitive position={[0, -1.1, 120]} rotation-y={Math.PI / 2} object={cinema.scene} scale={0.058} />
      
    </>
    )
}

export default Cinema