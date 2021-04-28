import React from 'react';
import RoomJoinPage from './Roomjoinpage';
import CreateRoom from './CreateRoomPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,

} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function Homepage({ name }) {
    const defaultVotes=2;
    return ( 
    
    <div>
        
        <Router>
            <Switch>
                <Route exact path='/'>
                    <h1> This is the homepage { name } </h1>
                </Route>
                <Route path='/join' component={RoomJoinPage}></Route>
                <Route path='/create' component={CreateRoom}></Route>
            </Switch>
        </Router>
    </div>
    
    )
}