import React from 'react';
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress,
  } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

function MusicPlayer(props) {

    const pauseSong =(()=>{
        const requestOptions = {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },

        };
        fetch('/spotify_link/pause', requestOptions)
        
    })
    const playsong =(()=>{
        const requestOptions = {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/spotify_link/play', requestOptions)
        
    })
    const songProgress = (props.time / props.duration) * 100;
    const handlePlayPause = (()=>{

        if(props.is_playing){
            pauseSong()
        }else{
            playsong()
        }
    })
    const handleSkipSong = (()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/spotify_link/skip', requestOptions)
        .then(response => {console.log("Skip", response)})

    })


  return (
    <div>

        <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {props.artists}
            </Typography>
            <div>
              <IconButton onClick={handlePlayPause}>
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={handleSkipSong}>
                <SkipNextIcon />{props.votes} {" "}/ {" "}{props.votes_required}
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
        
      </Card>
      <p>{props.is_playing}</p>




    </div>
  );
}

export default MusicPlayer;
