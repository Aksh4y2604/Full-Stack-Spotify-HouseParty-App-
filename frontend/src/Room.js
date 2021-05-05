import { Dialog, responsiveFontSizes } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import {Button,Typography,Grid} from '@material-ui/core';
import CreateRoom from './CreateRoomPage'


export default function Room({match,history}) {
    const [votesToSkip, setVotesToSkip] = useState(0)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIshost] = useState(false)
    const [showSettings,setShowSettings]=useState(false)
    let roomCode = match.params.roomCode;
    
    
    function updateShowSettings(value){
        setShowSettings(value)
    }
    
    
    function renderSettingsButton(){
        return (
            <Grid item xs={12} className='gridItem'>
                <Button variant="contained" color="primary" onClick={()=>updateShowSettings(true)}>Settings</Button>
            </Grid>
        )
    }
    
    
    function renderSettingsPage(){
        return(
            <Grid container spacing={2}>
                <Grid item xs={12} className="gridItem">
                    <CreateRoom 
                        update={true}
                        guest_CanPause={guestCanPause}
                        votes_ToSkip={votesToSkip}
                        roomCode={roomCode}
                        updateCallBack={getDetails}/>

                </Grid>
                <Grid item xs={12} className="gridItem">
                    <Button variant="contained" color="secondary" onClick={()=>updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }
    
    
    function getDetails(){
    fetch('/api/get-room'+'?code='+roomCode)
    .then((response)=>{
        if (!response.ok){
            history.push('/')
        }else{
            return response.json()}})
    .then((data)=>{
        console.log(data)
        setVotesToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIshost(data.is_host)
        console.log(data)
    })}
    
    
    const leaveroom=()=>{
        
        const requestOptions={
            method:"POST",
            header:{'Content-Type':"application/json"},

        };
        fetch('/api/leave-room',requestOptions)
        .then((_res)=>{history.push('/')})
    }


    useEffect(()=>{getDetails()},[])

    if(showSettings)
        {
            return renderSettingsPage()

        }
    return (
        
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} className="gridItem">
                <Typography variant="h5" component='h5'>RoomCode: {roomCode}</Typography>
                </Grid>
                <Grid item xs={12} className="gridItem">
                <Typography variant="h6" component='h6'>Votes:{votesToSkip}</Typography>
                </Grid>
                <Grid item xs={12} className="gridItem">
                <Typography variant="h6" component='h6'>Is Host={isHost.toString()}</Typography>
                </Grid>
                <Grid item xs={12} className="gridItem">
                <Typography variant="h6" component='h6'>Guest Can Pause={guestCanPause.toString()}</Typography>
                </Grid>
                {isHost ? renderSettingsButton() : null}
                <Grid item xs={12} className="gridItem">
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={()=>{leaveroom()}}

                > Leave Room </Button>
                </Grid>
                
                
                
            </Grid>
        </div>
    )

}