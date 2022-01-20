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
    var image_url = props.image_url;
    var song_name = props.song_name;
    var artist_name = props.artist_name;
    var album_name = props.album_name;
    var is_playing = props.is_playing; 
    const songProgress = (props.time / props.duration) * 100;

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
              <IconButton>
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>




    </div>
  );
}

export default MusicPlayer;
