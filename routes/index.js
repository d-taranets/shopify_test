const apiRouter = require('./api');
const authRouter = require('./auth');
const webhooksRouter = require('./webhooks');

module.exports = {
  apiRouter,
  authRouter,
  webhooksRouter
}