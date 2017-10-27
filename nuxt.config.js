const webpack = require('webpack')

module.exports = {
  /* ** Headers of the page */
  head: {
    title: '閱讀推廣與館藏充實計畫',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/handsontable.full.min.js' },
      { src: '/js/xlsx.full.min.js' },
      { src: '/js/ZeroClipboard.min.js' }
      // { src: '/js/jquery.min.js' }
      // { src: 'https://unpkg.com/element-ui/lib/index.js' }
    ]
  },
  /* ** Global CSS*/
  css: [
      'element-ui/lib/theme-default/index.css',
      '~/assets/css/bootstrap.min.css',
      '~/assets/css/handsontable.full.css',
      '~/static/icon/style.css',
      // '~/assets/css/main.css',
      // 项目中的 Sass 文件
      { src: '~/assets/scss/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  plugins: [{ src: '~/plugins/element-ui', ssr: true },
  {src: '~plugins/vue-cookie', ssr: false, injectAs: 'cookie'},
  { src: '~/plugins/nuxt-client-init.js', ssr: false }
],
  /* ** Add axios globally */
  build: {
    vendor: ['axios','element-ui','jquery'],
    // babel: {
    //   'plugins': [['component', [
    //     {
    //       'libraryName': 'element-ui',
    //       'styleLibraryName': 'theme-default'
    //     },
    //     'transform-async-to-generator',
    //     'transform-runtime'
    //   ]]],
    //   comments: true
    // },
    postcss: [
      require('autoprefixer')(),
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')()
    ],
    /* ** Run ESLINT on save */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.devtool = false
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
