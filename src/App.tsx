import React from 'react';
import {Button, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useActions, useAppState} from "./Overmind/OvermindHelper";

interface Props {

}

const getThemeObj = (theme: Theme) => {
    return {
        button: {marginTop: 8},
    }
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

const App: React.FC<Props> = (props) => {
    const {increase} = useActions()
    const {counter} = useAppState()

    const classes = useStyles();

    return <Grid style={{height: 200}} container direction='column' justify='center' alignContent='center'
                 alignItems='center'>
        <Typography>Counter: {counter}</Typography>
        <Button className={classes.button} variant='contained' color='primary' onClick={() => {
            increase(1)
        }}>+</Button>
        <Button className={classes.button} variant='contained' color='primary' onClick={() => {
            increase(-1)
        }}>-</Button>

    </Grid>
}

export default App;
