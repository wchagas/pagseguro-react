if (process.env.npm_lifecycle_event == 'build') {
	module.exports = require('./webpack/production.js')
} else if (process.env.npm_lifecycle_event == 'dev') {
	module.exports = require('./webpack/development.js')
}
