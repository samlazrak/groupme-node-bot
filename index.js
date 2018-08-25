const http = require('http');
const director = require('director');
const cool = require('cool-ascii-faces');
const bot = require('./bot.js');

const router = new director.http.Router({
  '/': {
    post: bot.respond,
    get: ping,
  },
});

const server = http.createServer((req, res) => {
  req.chunks = [];
  req.on('data', chunk => {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, err => {
    res.writeHead(err.status, { 'Content-Type': 'text/plain' });
    res.end(err.message);
  });
});

const port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}
