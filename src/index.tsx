import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from '@material-ui/core/styles';
import App from "./App";
import { theme } from "./Others/Theme";
import { Provider } from "react-redux";
import { store } from "./Others/StatesController";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
