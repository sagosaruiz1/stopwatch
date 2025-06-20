const { app, BrowserWindow, ipcMain } = require('electron');
let win;
function createWindow () {
    win = new BrowserWindow ({
        width: 400,
        height: 500,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.setMenuBarVisibility(false);
    win.loadFile('src/index.html');
    win.on("closed", () => {
        win=null;
    });
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

let maximizeToggle=false;
ipcMain.on("manualMinimize", () => {
    win.minimize();
});

let closeToggle=false;
ipcMain.on("manualClose", () => {
    app.quit();
});
