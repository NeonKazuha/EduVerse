import React from 'react'
import { Findme } from '../Utils/Findme'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Contentbox from './Contentbox'
import UplaodOffice from './UplaodOffice'
const SelectiveRenderInside = () => {
    const [me] = useAtom(Findme)
    const [show, setShow] = useState(false)
    ////console.log(me)
    if (me != null) {

        if (me.role == 'presenter') {
            if (!show) {


                setShow(true);
            }
            ////console.log("you are a presenter")
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

                show && <UplaodOffice />
            }
        </>

    )
}

export default SelectiveRenderInside