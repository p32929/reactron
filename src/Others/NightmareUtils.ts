import Nightmare from "nightmare";

interface INightmare extends Nightmare {
    show: (interval: number) => INightmare,
    hide: (interval: number) => INightmare
}

const TAG = "NightmareUtils"
// @ts-ignore
const nightmare: INightmare = window?.nightmare

export class NightmareUtils {
    static async openGoogle() {
        await nightmare.goto("https://www.google.com/")
    }
}