import React from 'react';
import {Typography,Grid,Button,ButtonGroup} from '@material-ui/core';

export default function HomepageContent({history}) {
    const join=()=>{
        fetch('/api/user-in-room')
        .then((res)=>res.json())
        .then((data)=>{
            if(data.code==null){
                history.push('/join')
            }
            else{
                history.push(`/room/${data.code}`)
            }
        })
    }
    return (
        <div>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} className="gridItem">
                    <Typography component="h2" variant='h2'>HouseParty</Typography>
                </Grid>
                <Grid item xs={12} className="gridItem">
                    <ButtonGroup variant="contained">
                    
                    <Button variant='contained' color="primary" onClick={()=>{join()}}>Join a Room</Button>
                    <Button variant='contained' color="secondary" onClick={()=>{history.push('/create')}}> Create a Room </Button>
                    </ButtonGroup>
                
                
                </Grid>
                
                

            </Grid>
        </div>
    )
}
