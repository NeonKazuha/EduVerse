import React, { useState, useEffect, } from 'react';
import { useFBX, useAnimations, Html } from '@react-three/drei';
import { useAtom } from 'jotai';
import { TalkAtom } from '../Utils/TalkAtom';
import { AIshowatom } from '../Utils/AIshowatom';
import { menuAtom } from '../Utils/GuildAtom';


const StoreGuy = () => {
    const [showmenuAtom, setShowMenuAtom] = useAtom(menuAtom)
    ////console.log(showmenuAtom);
    const [talkAtom] = useAtom(TalkAtom);
    const [talkLocal, setTalkLocal] = useState(false);
    const [showai] = useAtom(AIshowatom);
    const [currentAnimation, setCurrentAnimation] = useState("idle");

    const model = useFBX('./models/Storeguy.fbx');
    const ani = model.animations;
    model.animations[0].name = 'idle';

    const animations = useAnimations(ani, model);

    // const idle = useFBX("./models/StoreGuy.fbx"); // Assuming you have an idle animation file for the StoreGuy as well
    const talk = useFBX("./models/Talking2.fbx");
    ////console.log(talk);

    talk.animations[0].name = 'talk';

    if (ani.length < 5) {
        ani.push(model.animations[0]);
        ani.push(talk.animations[0]);
    }

    useEffect(() => {
        if (talkAtom !== talkLocal) {
            if (currentAnimation !== 'talk') {
                setCurrentAnimation('talk');
            }
            setTalkLocal(talkAtom);
        }

        // if (showai) {
        //     if (currentAnimation !== "greet") {
        //         setCurrentAnimation("greet");
        //     }
        // }
    }, [currentAnimation]);

    useEffect(() => {
        const action = animations.actions[currentAnimation];
        action
            .reset()
            .fadeIn(0.5)
            .play();

        return () => {
            action.fadeOut(0.5);
        };
    }, [currentAnimation]);

    return (
        <>
            <Html
                position={[65.5718369374643, 3, 33.88149327444435]}
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
                <div className='w-auto   rounded-sm px-[1px] border-white border-[0px] bg-gray-100/30 '>


                    {showmenuAtom ? (<h1 className='text-[5px]'>hello how can I help you ?</h1>) : (<h1 className='text-[5px]'>Please come back later !</h1>)}
                </div>
            </Html>
            <primitive object={model} rotation-y={Math.PI} position={[65.8718369374643, -0.9, 33.88149327444435]} scale={0.01} />
        </>
    );
};

export default StoreGuy;
