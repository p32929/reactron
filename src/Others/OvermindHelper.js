// npm install overmind overmind-react
// yarn add overmind overmind-react

import {createOvermind} from "overmind";
import {createHook} from "overmind-react";

export const useOvermind = createHook();
export const overmind = createOvermind({
    state: {
        counter: 0
    },
    actions: {
        increaseCounter({state}, value) {
            state.counter += value
        }
    }
});
