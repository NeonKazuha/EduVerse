import React from 'react';
import { Html } from '@react-three/drei';

const LeaderBoard = () => {
    const players = [
        { name: 'HuiHui', xp: 35, points: 1344, profilePic: 'https://via.placeholder.com/50' },
        { name: 'JohnDoe', xp: 30, points: 1200, profilePic: 'https://via.placeholder.com/50' },
        { name: 'JaneSmith', xp: 28, points: 1150, profilePic: 'https://via.placeholder.com/50' },
        { name: 'PlayerOne', xp: 25, points: 1100, profilePic: 'https://via.placeholder.com/50' },
        { name: 'RandomGuy', xp: 22, points: 1050, profilePic: 'https://via.placeholder.com/50' },
    ];

    return (
        <Html transform occlude={'blending'} pointerEvents='none' zIndexRange={[10, 1]} position={[10.8, 4.4, 39.4]} rotation-y={Math.PI / 2 + Math.PI / 6}
            scale={0.21}>
            <div className='w-[110vw] h-[50vw] p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg shadow-2xl border border-gray-700'>
                <h2 className='text-4xl font-extrabold mb-6 text-center text-yellow-400'>Leaderboard</h2>
                <div className='grid grid-cols-4 text-xl font-semibold mb-4 text-gray-300'>
                    <div>Rank</div>
                    <div>Name</div>
                    <div>XP</div>
                    <div>Points</div>
                </div>
                <hr className='border-gray-600 mb-4' />
                {players.map((player, index) => (
                    <div key={index} className={`grid grid-cols-4 items-center py-2 px-4 mb-2 rounded-lg ${index === 0 ? 'bg-yellow-600' : 'bg-gray-700'}`}>
                        <div className='text-2xl font-bold text-center'>{index + 1}</div>
                        <div className='flex items-center'>
                            <img src={player.profilePic} alt={player.name} className='w-10 h-10 rounded-full mr-4 border-2 border-white' />
                            <span className='text-lg'>{player.name}</span>
                        </div>
                        <div className='text-lg text-center'>{player.xp}</div>
                        <div className='text-lg text-center'>{player.points}</div>
                    </div>
                ))}
            </div>
        </Html>
    );
}

export default LeaderBoard;
