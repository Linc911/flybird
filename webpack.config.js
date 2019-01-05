const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: "source-map",
  mode:'development',
  entry:{
    index:path.join(__dirname,"./src/js/index.js"),
    // user:path.join(__dirname,"./src/js/user.js"),
    // login:path.join(__dirname,"./src/js/login.js")
  },
  output:{
    path:path.join(__dirname,"./dist/js"),
    filename:"[name].js"
  },
  module:{
    rules: [
      {test: /\.css$/,use: ["style-loader","css-loader"]},
      {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
      // { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=img/[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
          // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: '../img/[name].[hash:7].[ext]',
            publicPath:"img/"      //该地址不是唯一的，根据你的代码实际路由地址进行修改
        }
      },
      {test:/\.vue$/,use:"vue-loader"},
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
      {test: /\.js$/,use: ["babel-loader"], exclude: /(node_modules|bower_components)/},
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['common', 'index'],//引入指定js
        }),
    /* new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/login.html',
            chunks: ['common', 'login']
        }), */
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open:true
  }
}
