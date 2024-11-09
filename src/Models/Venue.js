import { useGLTF } from '@react-three/drei'
import React, { Suspense } from 'react'
import ThreatreScreen from '../Iframe/ThreatreScreen'

const Venue = () => {

    const VenueModel = useGLTF("./models/venue.glb")


    return (
        <Suspense>
            <primitive object={VenueModel.scene}
                position={[0, -1, -148]}

                scale={3} />
            <ThreatreScreen />
            
        </Suspense>
    )
}

export default Venue