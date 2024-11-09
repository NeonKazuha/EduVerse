import React from 'react'
import { useFBO } from '@react-three/drei'
import { useFBX } from '@react-three/drei'
import { useState, useEffect } from 'react'
import { TalkAtom } from '../Utils/TalkAtom'
// import {useControl
import { useAnimations } from '@react-three/drei'
import { AiMessageAtom } from '../Utils/AiMessageAtom'
import { AIshowatom } from '../Utils/AIshowatom'
import { useAtom } from 'jotai'
const BotClass = () => {
    const [talkAtom] = useAtom(TalkAtom)
    const [talkLocal, setTalkLocal] = useState(false);


    const [showai] = useAtom(AIshowatom)
    const model = useFBX('./models/Talking1.fbx')
    const [currentAnimation, setcurrentAnimation] = useState("idle")

    const ani = model.animations;
    model.animations[0].name = 'talk';
    const animations = useAnimations(ani, model)
    const idle = useFBX("./models/IdleBot1.fbx");
    const greet = useFBX("./models/Greeting1.fbx");
    greet.animations[0].name = 'greet';
    idle.animations[0].name = 'idle'
    if (ani.length < 5) {

        ani.push(idle.animations[0])
        ani.push(greet.animations[0])
    }
    ////console.log("booooooooooooooooooooooooooooooooooooooot")
    ////console.log(talkAtom, talkLocal);
    if (talkAtom != talkLocal) {
        if (currentAnimation != 'talk') {
            ////console.log("huaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            setcurrentAnimation('talk');
            // const val = talkAtom;
            //  setTalkLocal(!val)
        }
        setTalkLocal(talkAtom);
    }

    if (showai) {
        if (currentAnimation != "greet") {
            setcurrentAnimation("greet");
        }
    }

    useEffect(() => {
        const action = animations.actions[currentAnimation]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [currentAnimation])
    return (
        <primitive object={model} rotation-y={Math.PI / 2} position={[66, -1, -25]} scale={0.02} />
    )
}

export default BotClass