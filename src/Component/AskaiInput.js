import React, { useState } from 'react'
import axios from 'axios';
import { useAtom } from 'jotai';
import { AiMessageAtom } from '../Utils/AiMessageAtom';
import { AIshowatom } from '../Utils/AIshowatom';
import { TalkAtom } from '../Utils/TalkAtom';
const AskaiInput = () => {
    const [message, setMessage] = useAtom(AiMessageAtom);
    const [askai] = useAtom(AIshowatom);
    const [talkatom, setTalkAtom] = useAtom(TalkAtom)
    // ////console.log(askai)
    ////console.log(message);
    const [messagee, setMessagee] = useState("");
    const HandleOnchange = (e) => {
        setMessagee(e.target.value)
        ////console.log(message);


    }
    const HandleOnSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        setMessage("Leading..");
        ////console.log("hipjijpo");

        try {
            const form = new FormData();
            form.append('question', messagee); // Assuming file is obtained from an input element
            setMessage("Loading...");
            // ////console.log("Processing", path);

            const response = await axios.post('http://localhost:8000/answer_question/', form);

            ////console.log(response.data);
            const formattedAnswers = response.data.answer.replace(/\n/g, '<br>');
            ////console.log("revert hua")
            setTalkAtom(!talkatom);
            ////console.log(talkatom)

            setMessage(formattedAnswers);
            // Handle the response or update UI as needed
        } catch (error) {
            const val = talkatom
            setTalkAtom(!val);

            console.error('Error processing PDF:', error);
            setMessage("Error Occured ! Please check and try again");

            // Handle errors or show error messages
        }
    }
    return (
        //     <div className='bg-gray-800/55    w-full
        //   h-auto py-[1px] rounded-[12px] flex align-middle justify-center  -gap-[23px] border-[1px] border-black '  >
        //         <input type="text" className=' w-5/6 mx-2 rounded-[10px] px-3 border-2 font-extralight  border-black' />
        //         <button className='transition ease-in-out delay-50 px-3 rounded-[10px] 
        //         bg-gray-500


        //         text-white text-[32px] hover:bg-black hover:text-white  mr-3  ' > send </button>
        //     </div >
        <>
            {askai &&

                <div className="w-[25rem] left-[13rem] absolute z-10 bottom-12 mx-auto bg-transparent">

                    <form>
                        <label htmlFor="chat" className="sr-only">Your message</label>
                        <div className="flex items-center py-1 px-3 bg-gray-50/35 rounded-lg ">


                            <textarea onChange={(e) => { HandleOnchange(e) }} id="chat" rows="1" className="block mx-4 p-1 w-full text-[12px] text-gray-900/80 bg-white/45 rounded-lg border border-gray-300/50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                            <button onClick={HandleOnSubmit} className="inline-flex justify-center p-1 text-blue-600 rounded-full cursor-pointer 
                    border-[1px]
                    hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600/45">
                                <svg className="w-3 h-3 rotate-90" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            </button>
                        </div>
                    </form>



                </div>

            }
        </>

    )
}

export default AskaiInput