const pkg = require('./package');

const titleTemplate = chunk =>
  chunk ? `新元号予想${chunk}` : '新元号予想サイト';

module.exports = {
  mode: 'universal',

  /**
   * Environment variables
   */
  env: {
    /**
     * Origin of app
     * TODO
     */
    origin: 'http://localhost:3000'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    titleTemplate,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@uhyo_' },
      {
        hid: 'og:title',
        property: 'og:title',
        template: titleTemplate,
        content: ''
      },
      {
        property: 'og:image',
        template: () => `${process.env.origin}/gengou_happyou_blank.png`,
        content: ''
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: pkg.description
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/gengou_happyou_blank.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
};
