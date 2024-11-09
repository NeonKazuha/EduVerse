import { Html } from '@react-three/drei'
import React from 'react'
import { TheaterScreenAtom } from '../Utils/TheaterScreenAtom'
import {useAtom} from 'jotai'
const ThreatreScreen = () => {
    const [screen] = useAtom(TheaterScreenAtom)
    return (<>
{ screen && 
            <Html occlude="blending" rotation-y={-Math.PI / 2} zIndexRange={[10, 1]} transform position={[49, 9.5, 120]}
                scale={1}  >
                <iframe width={"1450px"} height={"700vh"} src="chrome-extension://opmeopcambhfimffbomjgemehjkbbmji/pages/player.html#http://localhost:8409/iptv/channel/2.m3u8?mode=segmenter" frameborder="5" />

            </Html>
 }
       
    </>
    )
}

export default ThreatreScreen