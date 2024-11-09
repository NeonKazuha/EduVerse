import React from 'react'
import { Findme } from '../Utils/Findme'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Contentbox from './Contentbox'
import OfficeContentbox from './OfficeContentbox'
const SelectiveRenderClass = () => {
    const [me] = useAtom(Findme)
    const [show, setShow] = useState(false)
    ////console.log(me)
    if (me != null) {

        if (me.role == 'student') {
            if (!show) {


                setShow(true);
            }
            ////console.log("you are a presentee")
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

                show && <Contentbox />
            }
        </>

    )
}

export default SelectiveRenderClass