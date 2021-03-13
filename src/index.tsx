import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {ThemeProvider} from '@material-ui/core/styles';
import {Provider} from "overmind-react";
import {createOvermind} from 'overmind'
import {config} from './Overmind/OvermindHelper'
import App from "./App";
import {theme} from "./Others/Theme";

const overmind = createOvermind(config)

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider value={overmind}>
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
