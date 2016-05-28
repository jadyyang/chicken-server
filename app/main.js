/**
 * Created by jady on 2016/5/25.
 */

const electron = require("electron");

// fixme 测试服务器样例
const testServerA = require("./test/servera");

const {app, BrowserWindow} = electron;

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

    // fixme 启动测试服务器
    testServerA.start();

    win.on("closed", () => {
        win = null;
    });
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