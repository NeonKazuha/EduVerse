import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const ShopModel = () => {
    const shop = useFBX('./models/Market.fbx')
  return (
      <primitive object={shop} position={[65.84252749750952, -0.9, 54.15368943309931]}  rotation-y={-Math.PI / 2}

          scale={0.11} /> 
         )
}

export default ShopModel