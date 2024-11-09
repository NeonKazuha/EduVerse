import React from 'react'
import { Findme } from '../Utils/Findme'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Contentbox from './Contentbox'
import UplaodOffice from './UplaodOffice'
import UploadClass from '../Pages/UploadClass'
import { Html } from '@react-three/drei'
const SelectiveRenderInside2 = () => {
    const [me] = useAtom(Findme)
    const [show, setShow] = useState(false)
    // ////console.log(me)
    if (me != null) {

        if (me.role == 'teacher') {
            if (!show) {


                setShow(true);
            }
            // ////console.log("you are a Teacher")
        } else {
            if (show) {
                setShow(false);
            }
        }
        // }
    }




    return (
        <>
            {

                show && <UploadClass />
            }
        </>

    )
}

export default SelectiveRenderInside2