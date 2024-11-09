import React from 'react'
import { AiMessageAtom } from '../Utils/AiMessageAtom'
import { useAtom } from 'jotai'
import AskaiInput from './AskaiInput';
import { Html } from '@react-three/drei';
import { TalkAtom } from '../Utils/TalkAtom';
const MessageBox = () => {
  const [message, setMessage] = useAtom(AiMessageAtom);
  const [talk] = useAtom(TalkAtom);
  //   ////console.log(message);
  // ////console.log(talk);
  return (
    <>
      <Html transform occlude={'blending'} zIndexRange={[10, 1]} position={[-23.65, 2.5, -3.5]} rotation-y={Math.PI / 2}
        scale={0.2}  >

        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1  bg-transparent items-end">
          <div className='bg-transparent' ><span class="px-4 py-5 rounded-lg inline-block rounded-br-none bg-blue-600 text-white transition-all ease-in-out " dangerouslySetInnerHTML={{ __html: message }} >


          </span></div>
        </div>
        {/* <AskaiInput /> */}
      </Html>

    </>
  )
}

export default MessageBox