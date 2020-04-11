module.exports = {
    base: '/blogs/',
    title: 'GHC_blogs',
    themeConfig: {
        nav: [
            { text: '基础', link: '/base/' },
            { text: '网络相关', link: '/network/' },
            { text: '框架相关', link: '/framework/' },
            { text: 'Github', link: 'https://github.com/Hongcheng1997' },
        ],
        sidebar: {
            '/base/': [{
                title: 'Javascript 基础',
                children: [
                    {
                        title: 'this 的指向',
                        path: 'javascript-basics/this'
                    },
                    {
                        title: '原型链',
                        path: 'javascript-basics/prototype'
                    },
                    {
                        title: '继承',
                        path: 'javascript-basics/inherit'
                    }
                ]
            },
            {
                title: 'ES6',
                children: [
                    {
                        title: '解构赋值',
                        path: 'es6/destructuring'
                    },
                    {
                        title: '异步解决方案',
                        path: 'es6/async'
                    },
                    {
                        title: 'Promise 简单实现',
                        path: 'es6/promise'
                    }
                ]
            },
            {
                title: 'Webpack',
                children: [
                    {
                        title: '基于 webpack 配置一个基本的启动程序',
                        path: 'webpack/base-config'
                    }
                ]
            },
            {
                title: '浏览器优化相关',
                children: [
                    {
                        title: '节流和防抖',
                        path: 'performance/throttle'
                    }
                ]
            }],
            "/network/": [
                {
                    title: 'HTTP 协议',
                    children: [
                        {
                            title: 'HTTP 报文结构',
                            path: 'http/structure'
                        }
                    ]
                }
            ],
            "/framework/": [
                {
                    title: 'Angular',
                    children: [
                        {
                            title: 'Angular 基本使用',
                            path: 'angular/angular'
                        }
                    ]
                }
            ]
        }
    }
}