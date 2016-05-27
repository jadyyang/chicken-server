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
    host:       "las.100credit.com",
    root:       path.resolve("servera")
};

exports.start = function() {
    server = new Server(config);
    server.start();
};