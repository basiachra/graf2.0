const electron = require('electron');
const {ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const isDev = require("electron-is-dev");

const { app, BrowserWindow, Menu, MenuItem, shell} = require('electron');
const defaultMenu = require('electron-default-menu');

// Zachowaj globalną referencję obiektu okna, jeśli tego nie zrobisz, okno
// zostanie zamknięte automatycznie, gdy obiekt JavaScript odśmieci pamięć.

// const setupEvents = require('./../installers/setupEvents');
const nativeImage = electron.nativeImage;

// if (setupEvents.handleSquirrelEvent()) {
//     // squirrel event handled and app will exit in 1000ms, so don't do anything else
//     return;
// }
const rootPath = path.join('./');
let icon = nativeImage.createFromPath(path.join(rootPath, 'assets', 'icons', 'win', 'icon2.png'));
let mainWindow, menu;

function createWindow () {
    // Stwórz okno przeglądarki.
    mainWindow = new BrowserWindow({ width: 1920, height: 1080, icon: icon });

    // i ładowanie index.html aplikacji.
    //mainWindow.loadFile('index.html');

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "index.html")}`
    );

    // Otwórz Narzędzia Deweloperskie.
    mainWindow.webContents.openDevTools();

    // Emitowane, gdy okno jest zamknięte.
    mainWindow.on('closed', () => {
        mainWindow = null
    });

    menu = defaultMenu(app,shell);
    console.log(menu.splice(0,0, {
        label: 'File',
        submenu:[
            {label: 'New File',
                click: async ()=> {
                    properitesWindow = new BrowserWindow({ width: 1000, height: 700,icon:null, fullscreenable:false,minimizable:false,modal:true, parent: mainWindow});
                    properitesWindow.loadURL(
                        isDev
                            ? "http://localhost:3000/properties"
                            : `file://${path.join(__dirname, "indexProp.html")}`
                    );

                    properitesWindow.webContents.openDevTools();
                    properitesWindow.setMenu(null);

                    // await mainWindow.webContents.executeJavaScript(
                    //     `document.getElementById('create').classList.add("show")`)
                }},
            {type: 'separator'},
            {
                label: 'Exit',
                role: 'quit'
            }
        ]
    } ));

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

    ipcMain.on('save',(event, arg) => {
        mainWindow.webContents.send('run',arg);
    } )


}


app.on('ready', createWindow);

// Zamknij, gdy wszystkie okna są zamknięte.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
