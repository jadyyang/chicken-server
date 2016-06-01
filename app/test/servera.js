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

let config1 = {

    hostname: "las.100credit.com",

    roles: [

        // 规则1：/modeler.html代理到http://192.168.162.193:8081/modeler.html
        {
            matches: {
                pathname: "/modeler.html"
            },

            actions: [
                {
                    command: "proxy to",
                    args: ["http://192.168.162.193:8081/modeler.html"]
                },
                {
                    command: "stop"
                }
            ]
        },

        // 规则2：/editor-app/代理到http://192.168.162.193:8081/editor-app/
        {
            matches: {
                pathname: "/editor-app/"
            },

            actions: [
                {
                    command: "proxy to",
                    args: ["http://192.168.162.193:8081/editor-app/"]
                },
                {
                    command: "stop"
                }
            ]
        },

        // 规则3：/service/代理到http://192.168.162.193:8081/service/
        {
            matches: {
                pathname: "/service/"
            },

            actions: [
                {
                    command: "proxy to",
                    args: ["http://192.168.162.193:8081/service/"]
                },
                {
                    command: "stop"
                }
            ]
        },

        // 规则4：/service/代理到http://192.168.162.193:8081/service/
        {
            actions: [
                {
                    command: "document on",
                    args: ["file://...."]
                },
                {
                    command: "stop"
                }
            ]
        }

    ]
};