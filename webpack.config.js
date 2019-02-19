module.exports = process.env.npm_lifecycle_event !== 'build' ? require('./webpack/development.js') : require('./webpack/production.js')
