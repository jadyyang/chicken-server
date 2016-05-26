/**
 * Created by jady on 2016/5/25.
 */

const electron = require("electron");
const path = require("path");

const Server = require("./server");

const {app, BrowserWindow} = electron;

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadURL(`file://${__dirname}/src/index.html`);

    win.WebContents.openDevTools();

    createServer();

    win.on("closed", () => {
        win = null;
    });
}

var server;

function createServer() {
    server = new Server(path.resolve("../test/site1"));
    server.start();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});