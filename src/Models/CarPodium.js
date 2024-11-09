import React from 'react'
import { useGLTF ,Html} from '@react-three/drei'
const CarPodium = () => {
    const car = useGLTF('./models/Car1.glb')

  return (
    <>
          <Html
              position={[33.55678793594416, 2, 10.214425307565293]}
              as='div' // Wrapping element (default: 'div')
              wrapperClass // The className of the wrapping element (default: undefined)
              prepend // Project content behind the canvas (default: false)
              center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
              // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
              distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
              zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
              pointerEvents='none'
              transform // If true, applies matrix3d transformations (default=false)
              sprite // Renders as sprite, but only in transform mode (default=false)
          >
              <div className='w-auto   rounded-sm px-[1px] border-white border-[0px] bg-gray-100/30 '> <h1 className='text-[5px]'>Huihui's Buggati</h1>
              </div>
          </Html>
    
      <primitive object={car.scene} position={[33.55678793594416, -0.1, 10.214425307565293]} rotation-y={-Math.PI / 2}

scale={1.31} />
</>
   )
}

export default CarPodium