import React from 'react'
import { MeshNormalMaterial } from 'three'
import { Html } from '@react-three/drei'


const Shop = () => {


  return (

    <>
      <Html
        position={[60.84252749750952, 1.3, 42.95368943309931]}
        rotation-y={Math.PI / 2}
        as='div' // Wrapping element (default: 'div')
        occlude="raycast"
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
        <div className='w-auto   rounded-sm px-[1px]  bg-gray-100/40 border-white border-[0px]  '>


          <h1 className='text-[5px]'> Stand here !</h1>
        </div>
      </Html>
      <mesh position={[60.84252749750952, -0.9, 42.95368943309931]} rotation-x={-Math.PI / 2} scale={2} >
        <planeGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>


  )
}

export default Shop