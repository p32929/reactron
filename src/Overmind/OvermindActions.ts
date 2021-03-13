import {Context} from './OvermindHelper'

export const increase = ({state}: Context, value: number) => {
    state.counter += value;
}
