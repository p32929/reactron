
process.once('loaded', () => {
    console.log('process-loaded');
    console.log("Preloading...")

    const isDev = require("electron-is-dev");
    const electron = require('electron');
    
    window.isDev = isDev
    window.version = (electron.app || electron.remote.app).getVersion()
});
