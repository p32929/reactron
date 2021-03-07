import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import {useOvermind} from "./Others/OvermindHelper";

const getThemeObj = (theme) => {
    return {}
}

const useStyles = makeStyles((theme) => (getThemeObj(theme)))

const App = (props) => {
    const {state, actions} = useOvermind()
    const classes = useStyles();

    return (
        <Grid>
            <p>Counter: {state.counter}</p>
            <button onClick={() => {
                actions.increaseCounter(1)
            }}>+
            </button>
            <button onClick={() => {
                actions.increaseCounter(-1)
            }}>-
            </button>

        </Grid>
    );
}

App.propTypes = {};

export default App;
