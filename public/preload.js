// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const Nightmare = require('nightmare')

Nightmare.action('hide',
    // The first callback defines the action on Electron's end,
    // making some internal objects available.
    function (name, options, parent, win, renderer, done) {

        // console.log('sdasdas')
        // `parent` is Electron's reference to the object that
        // passes messages between Electron and Nightmare.
        parent.respondTo('hide', (waitTime, done) => {
            let lastRequestTime = Date.now();

            // win.webContents allows us to control the internal
            // Electron BrowserWindow instance.
            win.minimize()
            win.webContents.on('did-get-response-details', () => {
                lastRequestTime = Date.now();
            });

            const check = () => {
                const now = Date.now();
                const elapsedTime = now - lastRequestTime;
                if (elapsedTime >= waitTime) {
                    done(); // Complete the action.
                } else {
                    setTimeout(check, waitTime - elapsedTime);
                }
            }
            setTimeout(check, waitTime);
        });

        done(); // Complete the action's *creation*.
    },
    // The second callback runs on Nightmare's end and determines
    // the action's interface.
    function (waitTime, done) {
        // This is necessary because the action will only work if
        // action arguments are specified before `done`, and because
        // we wish to support calls without arguments.
        if (!done) {
            done = waitTime;
            waitTime = 500;
        }

        // `this.child` is Nightmare's reference to the object that
        // passes messages between Electron and Nightmare.
        this.child.call('hide', waitTime, done);
    });

Nightmare.action('show',
    // The first callback defines the action on Electron's end,
    // making some internal objects available.
    function (name, options, parent, win, renderer, done) {

        // console.log('sdasdas')
        // `parent` is Electron's reference to the object that
        // passes messages between Electron and Nightmare.
        parent.respondTo('show', (waitTime, done) => {
            let lastRequestTime = Date.now();

            // win.webContents allows us to control the internal
            // Electron BrowserWindow instance.
            win.show();
            win.setMaximizable(false)
            win.setClosable(false)
            win.webContents.on('did-get-response-details', () => {
                lastRequestTime = Date.now();
            });

            const check = () => {
                const now = Date.now();
                const elapsedTime = now - lastRequestTime;
                if (elapsedTime >= waitTime) {
                    done(); // Complete the action.
                } else {
                    setTimeout(check, waitTime - elapsedTime);
                }
            }
            setTimeout(check, waitTime);
        });

        done(); // Complete the action's *creation*.
    },
    // The second callback runs on Nightmare's end and determines
    // the action's interface.
    function (waitTime, done) {
        // This is necessary because the action will only work if
        // action arguments are specified before `done`, and because
        // we wish to support calls without arguments.
        if (!done) {
            done = waitTime;
            waitTime = 500;
        }

        // `this.child` is Nightmare's reference to the object that
        // passes messages between Electron and Nightmare.
        this.child.call('show', waitTime, done);
    });

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

})

process.once('loaded', () => {
    console.log('process-loaded');
    console.log("Preloading...")

    const isDev = require("electron-is-dev");
    const electron = require('electron');

    const getElectronPath = () => {
        let devElectronPath = electron.remote.app.getPath('exe');
        let appPath = electron.remote.app.getAppPath()
        console.log('devElectronPath: ' + devElectronPath)
        console.log('appPath: ' + appPath)
        if (isDev) {
            return devElectronPath
        } else {
            let prodAppPath = ""
            if (process.platform == 'win32') {
                appPath = appPath.split("\\");
                appPath.pop();
                appPath = appPath.join("\\");
                prodAppPath = appPath + `\\app.asar.unpacked\\node_modules\\nightmare\\node_modules\\electron\\dist\\electron.exe`
            } else if (process.platform == 'darwin') {
                prodAppPath = appPath + `.unpacked/node_modules/nightmare/node_modules/electron/dist/Electron.app`
            } else {
                prodAppPath = appPath + `\\app.asar.unpacked\\node_modules\\nightmare\\node_modules\\electron\\dist\\electron`
            }
            console.log('prodAppPath: ' + prodAppPath)
            return prodAppPath
        }
    }

    partitionName = `persist:123123123123123`
    const nightmare = Nightmare({
        show: true,
        executionTimeout: 604800000,
        timeout: 604800000,
        waitTimeout: 604800000,
        gotoTimeout: 604800000,
        electronPath: getElectronPath(),
        webPreferences: {
            partition: partitionName,
        }
    })

    window.nightmare = nightmare
    window.electronPath = getElectronPath()
    window.isDev = isDev
    window.version = (electron.app || electron.remote.app).getVersion()
});
