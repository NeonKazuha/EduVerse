import React, { useEffect, useState, useRef } from 'react';
import { SocketManager } from '../Socketmanager';
import { InputBox } from '../Component/InputBox';
import { Button } from '../Component/Button';
import { socket } from '../Socketmanager';
import '../Pages/VoiceChat.css';
import { Peer } from 'peerjs';
import { connect } from 'socket.io-client';

const VoiceChat = () => {
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [roomId, setRoomId] = useState('');
    const myPeer = useRef(null);
    const [mute, setMute] = useState(false);
    const [mystream, setMystream] = useState(null);
    const videoGridRef = useRef(null);

    useEffect(() => {
        myPeer.current = new Peer();

        myPeer.current.on('open', id => {
            ////console.log('Peer joined room: ' + id);
        });

        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
            setMystream(stream);
            const myVideo = document.createElement('video');
            myVideo.srcObject = stream;
            myVideo.muted = true; // Mute local video by default
            myVideo.play();
            videoGridRef.current.appendChild(myVideo);
            addMuteButton(myVideo); // Add mute button for local video

            myPeer.current.on('call', call => {
                call.answer(stream);
                const video = document.createElement('video');
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream);
                });
            });

            socket.on('user-connected', userId => {
                connectToNewUser(userId, stream);
            });
        }).catch(error => {
            console.error('Error accessing webcam:', error);
        });

        return () => {
            // Cleanup code here if needed
        };
    }, []);

    function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        videoGridRef.current.appendChild(video);
        addMuteButton(video); // Add mute button for each new video
    }

    function connectToNewUser(userId, stream) {
        const call = myPeer.current.call(userId, stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
        call.on('close', () => {
            // video.remove();
        });
    }

    function addMuteButton(videoElement) {
        const muteButton = document.createElement('button');
        muteButton.innerHTML = 'Mute';
        muteButton.onclick = () => toggleMute(videoElement);
        videoElement.parentNode.appendChild(muteButton);
    }

    function toggleMute(videoElement) {
        setMute(!mute); // Update mute state
        videoElement.muted = !videoElement.muted;
        const muteButton = videoElement.parentNode.querySelector('button');
        muteButton.innerHTML = videoElement.muted ? 'Unmute' : 'Mute';
    }

    const handleCreateRoom = () => {
        ////console.log('Room created:', roomId);
        // Implement room creation logic here
    };

    const handleJoinRoom = () => {
        ////console.log('Joining Room:', roomId);
        // Implement join room logic here
    };

    return (
        <>
            {/* <div>VoiceChat</div>
            <InputBox label="RoomId" value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Room ID" />
            <Button label="Create Room" onClick={handleCreateRoom} />
            <InputBox label="Join Room" value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Room ID" />
            <Button label="Join Room" onClick={handleJoinRoom} />
            <SocketManager />

            {joinedRoom && <h1>Audio Joined</h1>}
{/*  */}
            {/* <Button onClick={() => toggleMute(mystream)} label={`MuteMyself + ${mute ? 'Muted' : 'Unmuted'}`} /> */}
            <div id="video-grid" className='bg-slate-600/10 w-[5rem]     flex flex-col absolute top-1/3 z-20 ' ref={videoGridRef}></div>
        </>
    );
};

export default VoiceChat;
