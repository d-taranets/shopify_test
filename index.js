const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const {apiRouter, webhooksRouter, authRouter} = require('./routes');
const {port} = require("./config");
require('./database');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  if (req.path === '/' || req.path === 'index.html') {
    res.set('Cache-Control', 'no-cache');
  } else {
    res.set('Cache-Control', 'max-age=31536000');
  }
  next();
});
app.use(express.static(path.join(__dirname, 'app/build')));
app.get('/', (_, res) => {
  // Don't cache index.html
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'app/build/index.html'));
});
app.get('/error', (req, res) => res.send('Something went wrong!'))

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/webhooks', webhooksRouter);



app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

exports.default = app;