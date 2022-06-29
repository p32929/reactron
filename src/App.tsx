import React, { useEffect } from 'react';
import { Button, Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { NightmareUtils } from './Others/NightmareUtils';
import { useSelector } from 'react-redux';
import { controller } from './Others/StatesController';

interface Props {

}

const getThemeObj = (theme: Theme) => {
    return {
        button: { marginTop: 8 },
    }
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

const App: React.FC<Props> = (props) => {
    const classes = useStyles();
    const counter = useSelector(() => controller.counter);

    useEffect(() => {
        console.log("Counter changed")
    }, [counter])

    return <Grid style={{ height: 200 }} container direction='column' justify='center' alignContent='center'
        alignItems='center'>
        <Typography>Counter: {counter}</Typography>

        <Button className={classes.button} variant='contained' color='primary' onClick={() => {
            controller.increase()
        }}>+</Button>
        <Button className={classes.button} variant='contained' color='primary' onClick={() => {
            controller.decrease()
        }}>-</Button>

        <Button onClick={async () => {
            await NightmareUtils.openGoogle()
        }}>Open nightmare</Button>

    </Grid>
}

export default App;
