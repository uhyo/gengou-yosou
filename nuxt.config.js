const pkg = require('./package');

const titleTemplate = chunk =>
  chunk ? `新元号予想${chunk}` : '新元号予想サイト';

module.exports = {
  mode: 'universal',

  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  serverMiddleware: [
    {
      path: '/sitemap',
      handler: '~/api/sitemap'
    }
  ],

  /**
   * Environment variables
   */
  env: {
    /**
     * Origin of app
     */
    origin: 'https://gengou-yosou.uhyo.space'
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
        content: '新元号予想サイト'
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
  },
  /**
   * Generate all list pages
   */
  generate: {
    routes: allListRoutes(),
    concurrency: 20
  }
};

/**
 * Generate all routes of gengou list.
 */
function allListRoutes() {
  const result = [];
  // TODO
  const pageTotal = 4885;
  for (let i = 1; i <= pageTotal; i++) {
    result.push(`/list/${i}`);
  }

  return result;
}
