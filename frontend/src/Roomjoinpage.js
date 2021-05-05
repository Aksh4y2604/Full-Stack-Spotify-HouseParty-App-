import React,{useState} from 'react';
import {TextField,Button,Grid,Typography} from '@material-ui/core'
export default function RoomJoinPage({history}) {
    const [roomcode,setRoomCode]=useState('')
    const[error,seterror]=useState('')
    function submithandler(){
        
        console.log(roomcode)
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                code:roomcode
            })
        };
        fetch('/api/join-room',requestOptions)
        .then((result)=>{
            if (result.ok){
                history.push(`/room/${roomcode}`)

            }
            else{
                seterror('Room Not Found!')
                setRoomCode('')
            }
        }).catch((error)=>{
            console.log(error)
        })

    }
    return (
        <div>
        <Grid container spacing={2}>
            <Grid item xs={12} className="gridItem">
                <Typography component="h4" variant='h4'> 
                    Join Room
                </Typography>
            </Grid>
            <Grid item xs={12} className="gridItem">
                <TextField 
                label="Room Code"
                placeholder="Room Code..." 
                value={roomcode} 
                onChange={(e)=>{setRoomCode(e.target.value)}} 
                helperText={error}
                color="primary"></TextField>
               

            </Grid>
            <Grid item xs={12} className="gridItem">
            <Button variant="contained" color="secondary" onClick={()=>submithandler()}>JOIN ROOM </Button>    
            </Grid>
            <Grid item xs={12} className="gridItem">
            <Button variant="contained" color="primary" onClick={()=>{history.push('/')}}>Back</Button>    
            </Grid>

            
        </Grid>
        </div>
    )
}