import { state, action, createStore } from 'usm-redux';

export class StatesController {
    @state
    counter = 0

    @action
    increase() {
        this.counter += 1;
    }

    @action
    decrease() {
        this.counter -= 1;
    }
}

export const controller = new StatesController();

export const store = createStore({
    modules: [controller],
});