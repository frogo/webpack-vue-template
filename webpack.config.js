const path = require('path')
const version = process.env.npm_package_version
const openInEditor = require('launch-editor-middleware')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Production 生产环境从node.js环境获取
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  // Entry package
  // 你可以理解为webpack开始加工你的项目的入口
  entry: () => {
    // Babel 只负责编译新标准引入的新语法，
    // 比如 Arrow function、Class、ES Module 等，
    // 它不会编译原生对象新引入的方法和 API，
    // 比如 Array.includes，Map，Set 等，
    // 这些需要通过 Polyfill 来解决
    let e = ['@babel/polyfill', './src/main.js']
    // 非侵入式mock解决方案，只有在开发环境才加载mock.js。
    if (prod) {
      return e
    } else {
      return e.concat(['./mock.js'])
    }
  },
  // 你可以理解为webpack结束加工你项目的出口
  output: {
    // Package path 打包的目录
    path: path.resolve(__dirname, 'dist'),
    // Server access address 比如js,css,图片的路径，如果在服务器上部署不是根目录，需要写上文件夹名
    publicPath: prod ? '' : '',
    // Scripts file name
    filename: prod ? 'scripts/[chunkhash].js' : '[name].js?[hash:8]'
  },
  // Setting mode 设置mode参数
  mode: prod ? 'production' : 'development',
  // source-map 该项配置开发环境可以代码断点调试
  devtool: prod ? '' : 'eval-source-map',
  // 开发环境的一些参数
  devServer: {
    host: '0.0.0.0', // 绑定本机的所有IP地址，让局域网其他人访问你的ip
    port: 3000, // 端口号
    open: false, // 自动挂起浏览器
    hot: true, // 热加载
    proxy: { // 前端的代理转发设置，通常前端开发环境下和服务端接口联调
      '/api': { // 接口标识符
        // Proxy target
        target: 'http://localhost:8080', // 后端服务地址
        // Needed for virtual hosted sites
        changeOrigin: true
      }
    },
    // vue-devtools工具在调试时候可以打开你本地的编辑器对应的文件
    // vue-devtools open .vue file in your editor
    before (app) {
      app.use('/__open-in-editor', openInEditor())
    }
  },
  module: {
    // 以下是各种loader，用来处理你项目所用到的前端资源
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.(js)$/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        // https://eslint.org/docs/user-guide/configuring#eslintignore
        loader: 'eslint-loader',
        options: { quiet: true }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          // This plugin extracts CSS into separate files
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          {
            // https://stylelint.io/user-guide/configuration/#ignorefiles
            loader: prod ? 'postcss-loader' : 'postcss-loader?sourceMap'
          }
        ]
      },
      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          {
            loader: prod ? 'sass-loader' : 'sass-loader?sourceMap',
            options: {
              // 由于node-sass下载源在国外，npm i容易卡，
              // 故使用dart-sass(npm包就叫sass)代替node-sass，但是需要添加如下代码
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        exclude: [path.resolve('src/icons')],
        options: {
          // limit 8Kb base64
          limit: '8192',
          name: prod ? 'images/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: prod ? 'fonts/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // VUE官方推荐必需插件
    new MiniCssExtractPlugin({ // 将 CSS 样式提取到单独的文件
      filename: prod ? 'styles/[contenthash].css' : '[name].css?[hash:8]'
    }),
    new CleanWebpackPlugin(), // 自动删除output.path 就是通常的'dist'目录
    // Plugin that simplifies creation of HTML files to serve your bundles
    new HtmlWebpackPlugin({ // 对HTML文件的配置，更多配置选参阅百度
      title: 'vue-webpack4-template', // app的title
      template: 'public/index.html', //  //生成的新的html文件所依赖的模板
      filename: 'index.html', // 生成的新的html文件的名字
      meta: { version: version } // html meta 信息
    }),
    new CopyWebpackPlugin([{ // 用来拷贝你需要的文件到编译后的根目录下
      from: 'public',
      toType: 'dir'
    }])
  ],
  optimization: { // 代码优化的设置，感兴趣可以阅读webpack4线上文档
    // split chunks
    splitChunks: {
      chunks: 'all'
    },
    // split runtime
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  resolve: {
    // import form ignore extension
    extensions: ['.js', '.vue', '.json'], // 省略后缀名，如果这样  import 'index',那么首先找‘index.js’,找不到后会找‘index.vue’,以此类推
    alias: {
      // https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds
      'vue$': 'vue/dist/vue.esm.js', // 全量编译
      // e.g. css ~@/assets/images, js @/components
      '@': path.resolve('src') // 使用 '@' 代替src 路径
    }
  }
}
