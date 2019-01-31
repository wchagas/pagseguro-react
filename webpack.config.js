module.exports = process.env.npm_lifecycle_event === 'build' ? require('./webpack/production.js') : require('./webpack/development.js');
