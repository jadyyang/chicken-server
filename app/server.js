/**
 * Created by jady on 2016/5/26.
 */

var express = require("express");

class Server {

    /**
     * 构造函数
     * @param rootPath
     */
    constructor(rootPath) {
        this._rootPath = rootPath;
    }

    /**
     * 开始方法
     */
    start() {
        // fixme 具体监听的端口号是需要根据设置来确定的
        this._app.listen(80);
    }

    /**
     * 获得app对象
     * @returns {*}
     * @private
     */
    get _app() {
        if (!this.__app) {
            // 构建app对象

            let app = express();

            // 设置静态资源路径地址
            app.use(express.static(this._rootPath));

            this.__app = app;
        }
        return this.__app;
    }

}

module.exports = Server;