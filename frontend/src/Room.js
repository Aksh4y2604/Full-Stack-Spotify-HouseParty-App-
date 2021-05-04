import { Dialog, responsiveFontSizes } from '@material-ui/core';
import React, { useState,useEffect } from 'react';


export default function Room({match}) {
    const [votesToSkip, setVotesToSkip] = useState(0)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIshost] = useState(false)
    let roomCode = match.params.roomCode;

    function getDetails(){
    fetch('/api/get-room'+'?code='+roomCode)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        setVotesToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIshost(data.is_host)
        console.log(data)
    })}


    useEffect(()=>{getDetails()},[])


    return (
        <div>
            <p>{roomCode}</p>
            <p>Votes={votesToSkip}</p>
            <p>guestCanPause={guestCanPause.toString()}</p>
            <p>isHost={isHost.toString()}</p>
        </div>
    )

}