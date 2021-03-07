import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {overmind} from "./Others/OvermindHelper";
import {Provider} from "overmind-react";
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from "./Others/Theme";

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
