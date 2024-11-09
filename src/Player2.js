import { OrbitControls, useGLTF } from '@react-three/drei'
import { socket, charactersAtom } from './Socketmanager'
import { useAtom } from 'jotai'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { RigidBody } from '@react-three/rapier'
import React from 'react'
import { useRef } from 'react'
// port { RigidBody } from '@react-three/rapier'
// import React from 'react'

import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
// import { useRef } from 'react'
import { useState } from 'react'
// import { updateCamera } from '@react-three/fiber/dist/declarations/src/core/utils'

//imma use this 



const Player2 = ({ id, position, rotation, delta }) => {
    // ////console.log(id,position,rotation,delta);


    // ////console.log(props.position);
    // ////console.log(props.delta);


    /**
     * 
    *
    *  SOCKET CONTROL CORDiNATES
    * 
    * 
    * 

     */

    const [characters] = useAtom(charactersAtom);
    // finding me 
    const character = characters.find((character) => { return character.id == socket.id })

    // ////console.log(character);
    /**
     * 
     * 
     * 
     *    TESTING?
     * 
     * 
     */
    let walkdirection = new THREE.Vector3();
    let rotateangle = new THREE.Vector3(0, 1, 0);
    let rotateQuaternion = new THREE.Quaternion();
    let CameraTarget = new THREE.Vector3();
    const controlsRef = useRef();


    const body = useRef();
    const [smoothCamera] = useState(new THREE.Vector3());
    const [subscribekeys, getkeys] = useKeyboardControls();
    const hamburger = useGLTF('./hamburger.glb');
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    });

    // model.scene.children.forEach((mesh)=>{
    //     mesh.castShadow = true;
    // });

    // const controlRef=useRef<typeof OrbitControls>();

    // const controlsRef = useRef<OrbitControlsProps>()
    // const controlRef = useRef<OrbitControls>(null);
    // const controlRef = useRef<OrbitControls | null>(null);
    // const controlsRef = useRef<any>();
    const camera = useThree((state) => state.camera)


    //imma use that

    const directionoffest = ({ forward, back, left, right }) => {
        var dirOffest = 0;
        if (forward) {
            if (left) {
                dirOffest = Math.PI / 4;
            } else if (right) {
                dirOffest = -Math.PI / 4;
            }
        } else if (back) {
            if (left) {
                dirOffest = Math.PI / 4 + Math.PI / 2;
            } else if (right) {
                dirOffest = Math.PI + Math.PI / 4;

            } else {
                dirOffest = Math.PI;
            }
        } else if (left) {
            dirOffest = Math.PI / 2;

        } else if (right) {
            dirOffest = -Math.PI / 2;

        }

        return dirOffest;
        /**
         *  Gandalf
         */


    }
    const model = useGLTF('./model.gltf');
    // body.current.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
    //**
    // Animate it
    /*/
*/
    // ////console.log(model.scene);
    // useFrame((state,delta)=>{

    //     // body.current.rotation = new THREE.Vector3(0,Math.PI,0);
    //     // ////console.log(getkeys());

    //         const {forward,left,right,jump,back} = getkeys();
    //         // socket.emit()
    //         const impulse = {x:0,y:0,z:0}
    //         const torque ={x:0,y:0,z:0}
    //         const  impulseStrength = delta;

    //         // if(forward){
    //         //     impulse.z = -1;
    //         // }
    //         // if(back){
    //         // impulse.z =+1;
    //         // }
    //         // if(right){
    //         // impulse.x =+1;
    //         // }
    //         // if(left){
    //         // impulse.x=-1;
    //         // }
    //         // if(jump){
    //         // impulse.y=+5;
    //         // }
    //         // body.current.applyImpulse(impulse);
    //         //   if (left) {
    //         //     torque.y = 1;
    //         //   } else if (right) {
    //         //     torque.y = -1;

    //         //   body.current.applyTorqueImpulse(torque);


    //         // ////console.log(keys);

    //         /** Camera */
    //         // const bodyposition = body.current.translation();
    //         // ////console.log(bodyposition)
    //         // const cameraposition = new THREE.Vector3();
    //         // cameraposition.copy(bodyposition);
    //         // cameraposition.z += 10;
    //         // cameraposition.y+=5;

    //         // const cameraTarget = new THREE.Vector3();

    //         // cameraTarget.copy(bodyposition);
    //         // cameraTarget.y+=2.25;

    //         // state.camera.position.copy(cameraposition);
    //         // state.camera.lookAt(cameraTarget);
    //         // body.current.applyTorqueImpulse(t);

    //         const bodyposition = body.current.position;
    //         const cameraPosition = new THREE.Vector3();
    //         cameraPosition.copy(bodyposition);
    //         cameraPosition.z += 5.25;
    //         cameraPosition.y += 2.65;
    //         // const TargetPosition = new THREE.Vector3();
    //         // TargetPosition.copy(bodyposition)
    //         // TargetPosition.y += 0.25;
    //         smoothCamera.lerp(cameraPosition, 0.1);
    //         // state.camera.position.copy(smoothCamera)
    //         // state.camera.lookAt(TargetPosition)
    //         // ////console.log(bodyposition)
    //         const cameraRotation = state.camera.rotation;
    //         // body.current.rotation(0, cameraRotation.y, 0);
    //         // body.current.rotation(state.camera.rotation);
    //         // ////console.log(state.camera.rotation);
    //         // ////console.log(body.current.rotation());

    //         /** */

    //         let AngleYcameraDirection = Math.atan2(
    //             state.camera.position.x - body.current.position.x,
    //             state.camera.position.z - body.current.position.z
    //         )

    //         //offset
    //         let newdirOffset = directionoffest({forward,back,left,right});  

    // // ////console.log("newdirection offset ",newdirOffset);   
    //         // const axis = new THREE.Vector3(0, 1, 0);
    //         //* rotating the model
    //         rotateQuaternion.setFromAxisAngle(
    //             rotateangle,AngleYcameraDirection+newdirOffset+Math.PI
    //         )
    //         // ////console.log(body.current);
    //         ////console.log(AngleYcameraDirection+newdirOffset);
    //         // socket.emit("rotation",[AngleYcameraDirection+newdirOffset]);

    //         body.current.quaternion.rotateTowards(rotateQuaternion,0.2);
    //         // body.current.setRotation(rotateQuaternion);

    //         //will it work
    //          state.camera.getWorldDirection(walkdirection);
    //          walkdirection.y=0;
    //          walkdirection.normalize();
    //          walkdirection.applyAxisAngle(rotateangle,newdirOffset);

    //          //walk run velocity
    //           let velocity= 0;



    //           //MOVE MODELS

    // // if(forward || back || left || right){
    // //     velocity=5;
    // // }else{
    // //     velocity =0;
    // // }

    // // ////console.log(walkdirection);
    // // ////console.log(walkdirection.x*velocity*delta);

    // //     const movex = walkdirection.x*velocity*delta;
    // //           const movez = walkdirection.z*velocity*delta;
    // //           if(delta){
    // //           body.current.position.x =position[0];
    // //           body.current.position.z =position[2];
    // // }

    //         //   body.current.setTranslation( new THREE.Vector3(movex,0,movez));

    //           //camera is more important
    //         //   state.camera.position.x += movex;
    //         //   state.camera.position.z += movez;
    // // updateCamera()
    // // CameraTarget.x = body.current.position.x;
    // // CameraTarget.y = body.current.position.y +2;
    // // CameraTarget.z = body.current.position.z;
    // // if(controlsRef.current){
    // //     controlsRef.current.target = CameraTarget;
    // // }

    //             })


    return (
        <>
            {/* <OrbitControls ref={controlsRef}   /> */}
            {/* <RigidBody colliders="cuboid"  type='kinematic' restitution={0.2} friction={0} ref={body} > */}
            {/* <primitive object={hamburger.scene} scale={0.2} ref={body}  rotation-y={Math.PI}  position-y={-1}/> */}
            <primitive object={model.scene} scale={2} position-y={-1} position-x={position[0]} position-z={position[2]} castShadow={true} />

            {/* </RigidBody> */}
        </>
    )
}

export default Player2