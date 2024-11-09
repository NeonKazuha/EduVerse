// Cordinates.js

import React from 'react';
import { useAtom } from 'jotai';
import { charactersAtom } from '../Socketmanager';
import { socket } from '../Socketmanager';
import Player from '../Player';
import Player2 from '../Player2';
import { useGLTF } from '@react-three/drei';
import { Her } from '../Models/Her';
import Char1 from '../Models/Char1';
import { P2 } from '../Models/P2';
import { P } from '../Models/P';
import { P4 } from '../Models/P4';
import { P5 } from '../Models/P5';
import { P3 } from '../Models/P3';
import { LowPoly } from './LowPoly';
import { Women1 } from '../Models/Women1';
import { Findme } from './Findme';

const Cordinates = () => {

  const model = useGLTF('./model.gltf');

  //----------
  // ////console.log(`my socket id ${socket.id}`);
  const [characters] = useAtom(charactersAtom);
  const [me, setMe] = useAtom(Findme)
  // console.log(characters.length);


  characters.map((char) => {
    if (char.id === socket.id) {
      //console.log(char.position);
      setMe(char)
    }
    // ////console.log(char.position);
    // ////console.log(char.delta);

  })

  return (
    <>
      {characters.map((character, index) => {
        if (character.id === socket.id) {

          return <Player key={character.id} id={character.id} delta={character.delta} rotation={character.rotation} position={character.position} aanimations={character.animation} />
        } else {

          let ComponentToRender = null;
          switch (index) { // Change 4 to the number of components in the sequence
            case 1:
              ComponentToRender = <P2 position={character.position} aanimations={character.animation} rotation={character.rotation} />;
              break;
            case 2:
              ComponentToRender = <P3 position={character.position} aanimation={character.animation} rotation={character.rotation} />
              break;
            case 3:
              ComponentToRender = <P4 position={character.position} aanimation={character.animation} rotation={character.rotation} />
            default:
              ComponentToRender = <P position={character.position} aanimation={character.animation} rotation={character.rotation} />
              break;
          }
          return ComponentToRender;




          //----------



          // return <Player2 key={character.id} id={character.id} delta={character.delta} rotation={character.rotation} position={character.position} />

          // return (
          // <Her  position={[character.position[0],character.position[1],character.position[2]]} scale={ 1.5 }
          //    rotation={[0, character.rotation[0], 0]}  />
          // <>
          // <P2 />
          // </>
          // <Women1/>
          //     <mesh castShadow position={[character.position[0],character.position[1],character.position[2]]} scale={ 1.5 }
          //     rotation={[0, character.rotation[0], 0]}  // Set the rotation property

          //     >
          //     <boxGeometry />
          //     <meshStandardMaterial color="mediumpurple" />
          // </mesh>

          //  <Player2 key={character.id} id={character.id} delta={character.delta} rotation={character.rotation} position={character.position} />
          //   // <primitive object={model.scene} scale={2} position={[character.position[0],character.position[1],character.position[2]]}  castShadow={true} />
          //   null

          // )
        }
      }
      )}
    </>
  );
};

export default Cordinates;
