/**
 * Created by jady on 2016/5/26.
 */

var express = require("express");
var Response = require("./type/response");

var requestHelper = require("./helper/request");
var pluginHelper = require("./helper/plugin");
var roleHelper = require("./helper/role");

/**
 * 把一个数组变成一个异步迭代器
 * @param array
 */
function* toIterator(array) {
    for (var item of array) {
        if (yield item) break;
    }
}

function* getActionIterator(roles) {
    for (var role of roles) {
        // 如果本规则存在验证规则，而request又不匹配，那就跳过本规则
        var matches = role.matches;
        if (matches && !roleHelper.matched(matches, request)) continue;

        // 匹配本规则，开始后续的处理部分

        for (var action of role.actions) {
            var args = action.args;
            if (yield {
                    command: action.command,
                    args: Array.isArray(ags) ? args.slice() : []
                }) {
                // 如果需要结束，那就直接返回
                return;
            }
        }
    }
}

class Server {

    /**
     * 构造函数
     * @param rootPath
     */
    constructor(config) {
        this._config = this._fillConfig(config);
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

            // 增加log
            // todo

            // 核心的处理方法
            app.use(this._aRequest);

            /*// 设置静态资源路径地址
             app.use("/", express.static(this._config.root));*/

            this.__app = app;
        }

        return this.__app;
    }

    /**
     * @param config
     */
    _fillConfig(config) {
        // todo

        return config;
    }

    /**
     * 一个请求的处理过程
     * @param req
     * @param res
     * @param next
     * @private
     */
    _aRequest(req, res, next) {
        // 从req中解析到request对象
        let request = requestHelper.getRequest(req);
        let response = new Response();

        // 循环所有规则，挨个进行判断

        let actionIterator = getActionIterator(this._config.roles);

        let doAction = (() => {
            // 获得本次要执行的命令和参数信息
            let {value: {command, args}, done} = actionIterator.next();

            // 把action的信息交给plugin来进行处理
            pluginHelper.exe(request, response, command, args).then((() => {
                // 如果request已经被标记为结束，或者已经是最后一个action，那就结束之
                if (request.end === true || done) {
                    this._endRequest(request, response);
                } else {
                    // 开始下一个处理
                    doAction();
                }
            }).bind(this));
        }).bind(this);

        doAction();
    }

    /**
     * 结束一个请求
     * @param request
     * @param response
     * @private
     */
    _endRequest(request, response) {
        // todo
    }

}

module.exports = Server;