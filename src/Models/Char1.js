import React from 'react'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { useController } from '@react-three/xr';
import { useControls } from 'leva'
import { useEffect } from 'react';
const Char1 = (props) => {
    ////console.log(props);

    const character1 = useFBX('./models/Angry.fbx')
    const ani = character1.animations;
    // let aniname = ani.name;
    const animations = useAnimations(ani, character1)
    ////console.log(animations);
    const { animationName } = useControls({
        animationName: { options: animations.names }
    })
    useEffect(() => {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animationName])


    ////console.log(animationName);
    // ////console.log(character1);
    return (
        <primitive object={character1} scale={0.02}
            position={[props.position[0], props.position[1], props.position[2]]}
            rotation={[0, props.rotation[0], 0]} />

    )
}

export default Char1