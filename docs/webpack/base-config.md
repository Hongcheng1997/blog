# 前言

搭建一个基于 webpack 运行的 cli，方便平时写一些 demo 使用，同时做一个简单的记录

## entry、output

新建一个目录 webpack-starter，进入目录

```
生成一个 package.json 文件
npm init -y

在本地项目安装 webpack
npm install webpack webpack-cli --save-dev
```

项目结构如下：

```
webpack-starter
  |- node_modules
  |- package.json
```

创建 src 以及 webpack 的配置文件

**src/index.js**

```
console.log('hello webpack')
```

**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  }
};
```

项目结构如下：

```
webpack-starter
  |- node_modules
  |- package.json
+ |- webpack.config.js
+ |- /src
+   |- index.js
```

通过命令：npx webpack 打包代码，打包完成后项目会多一个 dist 目录就是 webpack 打包后的代码。 在 dist 目录下 创建 index.html，并将 main.js 引入。打开 html 可以看见控制台输出了 hello webpack

## plugins

### clean-webpack-plugin

clean-webpack-plugin 的作用是在 webpack 打包之前会先删除 dist 目录

安装 clean-webpack-plugin

```
npm install --save-dev clean-webpack-plugin
```

修改配置文件

**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
+ |-  plugins: [
+ |-    new CleanWebpackPlugin()
+ |-  ]
};
```

再次打包发现 dist 目录下的 html 不见了，说明在打包之前，dist 目录被删除了。但是麻烦的是每次重新打包完成后，都要手动创建 html 打开网页。然而，可以通过一些插件，会使这个过程更容易操控。

### html-webpack-plugin

html-webpack-plugin 会自动生成 html 入口，并且将 js 引入 html

安装 html-webpack-plugin

```
npm install --save-dev html-webpack-plugin
```

修改配置文件

**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
+ |- new HtmlWebpackPlugin({
+ |-   template: 'src/index.html'
+ |- })
  ]
};
```

此时在去打包会发现 dist 目录自动创建了 html，并且引入了对应的 js 文件。但是每次修改代码都要重新打包一次，这个开发效率太低了。然而，可以配置模块热替换

## webpack-dev-server

安装 webpack-dev-server

```
npm install --save-dev webpack-dev-server
```

修改配置文件

**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
+ |- devServer: {
+ |-    contentBase: './dist'
+ |-  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
```

运行命令 npx webpack-dev-server --open 程序会自己跑起来，并且打开一个网页。当再去修改代码时，程序就会自动打包，并且网页也会自动刷新。

## loader

什么是 loader ？实际上webpack 打包时只能识别 js 文件，对于其他类型文件比如（css、vue、ts）等是无法识别的。因此要打包其他的类型文件就需要通过 loader 来告诉 webpack 要怎么去处理这类型的文件。

**style-loader、css-loader**

为了从 JavaScript 模块中 import 一个 CSS 文件，需要在 module 配置中安装并添加 style-loader 和 css-loader

```
npm install --save-dev style-loader css-loader
```

**webpack.config.js**

```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
       path: path.resolve(__dirname, 'dist')
    },
+ |- module: {
  + |- rules: [{
    + |- test: /\.css$/,
      + |- use: [
        + |- 'style-loader',
        + |- 'css-loader'
      + |- ]
  + |- }]
+ |- },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ]
};
``` 

<!-- mode 区别 webpack-merge、source-map -->
