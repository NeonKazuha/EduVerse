import React from 'react';
import { useAtom } from 'jotai';
import { charactersAtom } from '../Socketmanager';

const AttendanceResults = () => {
    const [characters] = useAtom(charactersAtom);

    return (
        <div className="mt-4">
            <h3>Attendance Results:</h3>
            <ul>
                {characters.map(character => (
                    <li key={character.id}>
                        {character.id}: {character.present ? "Present" : "Absent"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendanceResults;