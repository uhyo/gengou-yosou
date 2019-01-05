const dispatch = require('micro-route/dispatch');
const { Nuxt, Builder } = require('nuxt');

// Require nuxt config
const config = require('../nuxt.config.js');
// Create a new nuxt instance
const nuxt = new Nuxt(config);
// Enable live build & reloading on dev
const isDev = nuxt.options.dev;
if (isDev) {
  new Builder(nuxt).build();
}

module.exports = async (req, res) => {
  await dispatch().dispatch('*', ['GET'], (req, res) => {
    if (!isDev) {
      res.setHeader(
        'Cache-Control',
        'public, max-age=86400, s-max-age=2592000'
      );
    }
    return nuxt.render(req, res);
  })(req, res);
};
