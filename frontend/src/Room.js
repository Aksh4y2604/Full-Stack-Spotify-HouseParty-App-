import { Dialog, responsiveFontSizes } from '@material-ui/core';
import React, { useState,useEffect,useRef } from 'react';
import {Button,Typography,Grid} from '@material-ui/core';
import CreateRoom from './CreateRoomPage'
import MusicPlayer from './MusicPlayer';


export default function Room({match,history}) {
    const [votesToSkip, setVotesToSkip] = useState(0)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIshost] = useState(false)
    const [showSettings,setShowSettings]=useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [song, setSong] = useState(null)
    const [dependency, setDependency] = useState(0)
    let roomCode = match.params.roomCode;
    
    function AuthenticateSpotify(){
            console.log('Authenticating Spotify')
            fetch("/spotify_link/isAuth")
            .then(res => res.json())
            .then(data => {
                if(!data.authenticated){
                    console.log(data);
                    fetch('/spotify_link/get_auth_url')
                    .then(res => res.json())
                    .then(data => {
                        window.location.replace(data.url);
                        console.log(data.url);
                        });
                }else{
                    setIsAuthenticated(true);
                }
            });
    }
    const useInterval = (callback, delay) => {

        const savedCallback = useRef();
      
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
      
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }
    //polling for song changes

        
    function updateShowSettings(value){
        setShowSettings(value)
    }
    useInterval(getCurrentSong, 1000);
    
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
    function getCurrentSong(){
        fetch('/spotify_link/current_song')
        .then(res => {
            if(!res.ok){
                console.log(res);
                return {"song": 'not found '}
            }else{
                console.log(res)
                return res.json();
            }
        })
        .then(data => {
            console.log("Current Song: ",data);
            setSong(data);
        })
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
        console.log(data.is_host)
/*         setIshost(data.is_host)
        console.log(isHost) */
        if(data.is_host){
            setIshost(true)
            AuthenticateSpotify()
            /* get_current_song() */
        }
    })}
    
    
    const leaveroom=()=>{
        
        const requestOptions={
            method:"POST",
            header:{'Content-Type':"application/json"},
        };
        fetch('/api/leave-room',requestOptions)
        .then((_res)=>{history.push('/')})
    }


    useEffect(()=>{
        getDetails();
        getCurrentSong();
        
    },[])


    if(showSettings)
        {
            return renderSettingsPage()

        }
    return (
        
        <div>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} className="gridItem">
                    <Typography variant="h5" component='h5' padding="4">Code: {roomCode}</Typography>
                </Grid>
                <Grid item xs={12} className="gridItem">
                    <MusicPlayer {...song}></MusicPlayer>
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