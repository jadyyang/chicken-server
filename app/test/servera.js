/**
 * Created by jady on 2016/5/27.
 */


const path = require("path");
const Server = require("../server");

let server;

/**
 * 服务器的配置信息
 * @type {{}}
 */
let config = {
    name:       "localhost",
    root:       path.resolve(__dirname, "./servera")
};

exports.start = function() {
    server = new Server(config);
    server.start();
};