import React from 'react';
import AlertMessage from './AlertMessage';
import { charactersAtom } from '../Socketmanager';
import { useAtom } from 'jotai';
import Doubt from './Doubt';
import { Findme } from '../Utils/Findme';

const DoubtPanel = () => {
    const [characters] = useAtom(charactersAtom);
    const [userRole,setRole]  = useAtom(Findme);
    return (
        <>
            <div className='w-auto z-10 mr-1 bg-white/0 absolute right-1 top-52'>
                {characters.map((character) => {
                    if (character.doubt) {
                        return (
                            <AlertMessage
                                key={character.id}
                                _socketid={character.id}
                                userRole = {userRole}
                                message="Raised a doubt"
                            />
                        );
                    }
                    return null;
                })}
            </div>
            {userRole!=null &&( userRole.role === 'student'|| userRole.role == 'presentee'
             )&& <Doubt />}
        </>
    );
};

export default DoubtPanel;