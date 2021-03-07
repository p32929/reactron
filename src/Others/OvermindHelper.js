// npm install overmind overmind-react
// yarn add overmind overmind-react

import {createOvermind} from "overmind";
import {createHook} from "overmind-react";
import {GlobalVars} from "./GlobalVars";
import {getWebsite} from "./ServerCallings";
import {BetsManager} from "./BetsManager";

export const useOvermind = createHook();
export const overmind = createOvermind({
    state: {
        dialog: null,
        everything: {
            common: {
                website: getWebsite(),
                targetProfitAccumulation: {
                    percentage: {
                        enabled: true,
                        value: 10
                    },
                    coins: {
                        enabled: false,
                        value: '1.000000'
                    }
                },
                whenTargetAccumulated: {
                    stopAll: true,
                    stopOnWin: false
                }
            },
            bots: [],
            email: "",
        }
    },
    actions: {
        // commons
        changeWebsite({state}, website) {
            if (website.toString().includes("dice")) {
                state.everything.common.website = "https://www.999dice.com"
                localStorage.setItem("website", "https://www.999dice.com")
            } else if (website.toString().includes("doge")) {
                state.everything.common.website = "https://www.999doge.com"
                localStorage.setItem("website", "https://www.999doge.com")
            } else {
                state.everything.common.website = website
            }
        },
        // Add delete logout bot
        addBot({state}) {
            state.everything.bots = [
                ...state.everything.bots,
                GlobalVars.getDummyBot(),
            ]
            BetsManager.addBotState()
            BetsManager.showBotStatesLength()
        },
        deleteBot({state}, botIndex) {
            state.everything.bots = state.everything.bots.filter((item, index) => {
                return index !== botIndex
            })
            BetsManager.removeBotState(botIndex)
            BetsManager.showBotStatesLength()
        },
        logoutBot({state}, botIndex) {
            state.everything.bots[botIndex].session = GlobalVars.getBotDummySession()
        },
        // Dialog
        setDialog({state}, dialog) {
            state.dialog = dialog
        },
        // SESSION JSON
        setEverything({state}, everything) {
            state.everything = everything
            for (var i = 0; i < state.everything.bots.length; i++) {
                BetsManager.addBotState()
            }
            BetsManager.showBotStatesLength()
        },
        // TOP BAR
        setTargetAccumulationPercentage({state}, {enabled, value}) {
            console.log(`${typeof enabled} -- ${typeof value}`)
            if (enabled) {
                state.everything.common.targetProfitAccumulation.percentage.enabled = enabled
                state.everything.common.targetProfitAccumulation.percentage.value = value
                state.everything.common.targetProfitAccumulation.coins.enabled = !enabled
            }
        },
        setTargetAccumulationCoins({state}, {enabled, value}) {
            console.log(`${typeof enabled} -- ${typeof value}`)
            if (enabled) {
                state.everything.common.targetProfitAccumulation.coins.enabled = enabled
                state.everything.common.targetProfitAccumulation.coins.value = value
                state.everything.common.targetProfitAccumulation.percentage.enabled = !enabled
            }
        },
        setWhenTargetAccumulated({state}, {stopAll, stopOnWin}) {
            if (stopAll) {
                state.everything.common.whenTargetAccumulated.stopAll = stopAll
                state.everything.common.whenTargetAccumulated.stopOnWin = !stopAll
            } else if (stopOnWin) {
                state.everything.common.whenTargetAccumulated.stopOnWin = stopOnWin
                state.everything.common.whenTargetAccumulated.stopAll = !stopOnWin
            }
        },
        //// BOT
        setBotTabIndex({state}, {botIndex, tabIndex}) {
            state.everything.bots[botIndex].currentTabIndex = tabIndex
        },
        // ACCOUNT TAB
        setBotSession({state}, {botIndex, session, username, password}) {
            state.everything.bots[botIndex].session = session
            state.everything.bots[botIndex].account.username = username
            state.everything.bots[botIndex].account.password = password
        },
        setAccountTabInfo({state}, {botIndex, obj}) {
            state.everything.bots[botIndex].account = {
                ...state.everything.bots[botIndex].account,
                ...obj
            }
        },
        // PLAY TAB
        setBotBalance({state}, {botIndex, balance}) {
            state.everything.bots[botIndex].session.Doge.Balance = balance
            console.log(state.everything.bots[botIndex].session.Doge.Balance)
        },
        setBotConnected({state}, {botIndex, connected}) {
            state.everything.bots[botIndex].connected = connected
        },
        // Bet set tab
        setBetSetValue({state}, {botIndex, obj}) {
            state.everything.bots[botIndex].betSet = {
                ...state.everything.bots[botIndex].betSet,
                ...obj
            }
        },
        // stat tab
        setStatValue({state}, {botIndex, obj}) {
            state.everything.bots[botIndex].stat = {
                ...state.everything.bots[botIndex].stat,
                ...obj
            }
        },
        //
        setPlayValue({state}, {botIndex, obj}) {
            state.everything.bots[botIndex].play = {
                ...state.everything.bots[botIndex].play,
                ...obj
            }
        },
        //
        setEmail({state}, email) {
            state.everything.email = email
        }
    }
});
