import React from 'react'
import { Findme } from '../Utils/Findme'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Contentbox from './Contentbox'
import OfficeContentbox from './OfficeContentbox'
const SelectiveRender = () => {
    const [me] = useAtom(Findme)
    const [show, setShow] = useState(false)
    ////console.log(me)
    if (me != null) {

        if (me.role == 'presentee') {
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

                show && <OfficeContentbox />
            }
        </>

    )
}

export default SelectiveRender