const path = require('path');
const fs = require('fs');

const mods = fs
  .readdirSync(path.resolve('node_modules'))
  .filter(str => !/^[\.\@]/.test(str));
console.log(mods);
