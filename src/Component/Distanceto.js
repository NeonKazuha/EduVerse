import React, { useState } from 'react'
import { charactersAtom } from '../Socketmanager'
import { useAtom } from 'jotai'
import { socket } from '../Socketmanager'
import * as THREE from "three"
const Distanceto = (cordinates) => {
    // ////console.log(cordinates[0])
    const [showmenu, setShowMenu] = useState(false)
    let Me = null;
    const [characters] = useAtom(charactersAtom);
    characters.map((char) => {
        if (char.id == socket.id) { Me = char }
    })
    const DefaultCordinates = new THREE.Vector3(cordinates[0], cordinates[1], cordinates[2]);
    if (Me != null) {
        const MyPosition = new THREE.Vector3(Me.position[0], Me.position[1], Me.position[2]);
        if (MyPosition.distanceTo(DefaultCordinates) <= 3) {
            !showmenu ? setShowMenu(true) : null;
            // ////console.log("In")
            return true
        } else {

            showmenu ? setShowMenu(false) : null;
            // ////console.log("out")
            return false
        }
    } else {
        return false
    }
}

export default Distanceto