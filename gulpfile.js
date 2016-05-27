/**
 * Created by jady on 2016/5/26.
 */

const gulp = require("gulp");
const childProcess = require("child_process");
const electron = require("electron-prebuilt");

gulp.task("run", () => {
    childProcess.spawn(electron, ["", "./app"], {
        stdio: "inherit"
    });
});