import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,

} from 'react-router-dom';
export default function CreateRoom({history}) {
    const defaultVotes=2;
    const [guestCanPause,setGuestCanPause]=useState(true);
    const [votesToSkip,setVotesToSkip]=useState(defaultVotes);
    
    function handleVoteChange(e){
        setVotesToSkip(parseInt(e.target.value))
    }
    
    function handleGuestCanPauseChange(e){
        if (e.target.value==='true'){
            setGuestCanPause(true)
        }
        else{
            setGuestCanPause(false)
        }
        /* setGuestCanPause(e.target.value==='true'? true: false) */
    }
    function handleRoomButtonPressed(){
        const requestOptions={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                votes_to_skip:votesToSkip,
                guest_can_pause:guestCanPause,

            }),
        };
        fetch('/api/create-room',requestOptions)
        .then((response)=>response.json())
        .then((data)=>history.push('/room/'+data.code));

    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant='h4'> 
                Create Room 
                    </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component='fieldset'>
                    <FormHelperText>
                        <div align='center'>
                            Guest Control of Playback State


                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                        <FormControlLabel
                            value='true'
                            control={<Radio color='primary'/>}
                            label="play/pause"
                            labelPlacecment="bottom"
                        />
                        <FormControlLabel
                            value='false'
                            control={<Radio color='secondary'/>}
                            label="No Control"
                            labelPlacecment="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                    required={true} 
                    type="number" 
                    onChange={handleVoteChange}
                    defaultvalue={defaultVotes}
                    inputProps={{min:1,
                    style:{textAlign:'center'}}}

                    >

                        <FormHelperText>
                            <div align='center'>
                                Votes Requeired to Skip So

                            </div>
                        </FormHelperText>
                    </TextField>
                </FormControl>

            </Grid>
                <Grid item xs={12} align='center'>
                    <Button color='secondary' variant='contained' onClick={handleRoomButtonPressed}>Create A Room</Button>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button color='primary' variant='contained' to='/'  component={Link}>Back</Button>
                </Grid>
        </Grid>
    )
}