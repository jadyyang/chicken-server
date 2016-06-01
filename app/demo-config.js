/**
 * Created by jady on 2016/6/1.
 */

let config1 = {

    // 匹配规则
    protocol: "",
    hostname: "",
    port: "",

    /**
     * 规则列表。
     * 规则是有顺序的，一般来说是从上到下
     */
    roles: [

        /**
         * 一个规则项。
         * 一般一个规则项，用来处理匹配某类规则的请求（注重于request）
         */
        {
            /**
             * 匹配项部分。
             * 每个规则，都需要匹配项。只有满足这些匹配项，才能执行本规则
             * 匹配项可以有多项进行联合匹配。
             * 每一项的命，都是一个uri的特定组成部分
             * 每一项的值可以有以下几种类型：
             * # 纯粹的字符串。此时就是匹配前缀
             * # 正则表达式。那就是直接匹配是否满足了
             *
             * 需要考虑的问题，能够匹配cookie和header吗？
             */
            protocol: "http:",

            hostname: "xxx.com",
            host: "xxx.com:80",
            port: "80",

            pathname: "/p/a/t/h",
            search: "?param=value",
            path: "/p/a/t/h?param=value",

            uri: "http://xxx.com:80/p/a/t/h?param=value",

            /**
             * 规则的处理部分，一般就是顺序执行
             */
            actions: [
                {

                },
                {
                    "document root": ["/", "file://d/...."]
                }
            ]

        }
    ]
};