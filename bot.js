const HTTPS = require('https');
const cool = require('cool-ascii-faces');

const botID = process.env.BOT_ID;

function respond() {
  const request = JSON.parse(this.req.chunks[0]);

  const botRegex = /^\/Jobe bot$/;

  if (request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log('200');
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  const botResponse = cool();

  const options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
  };

  const body = {
    bot_id: botID,
    text: botResponse,
  };

  console.log(`sending ${botResponse} to ${botID}`);

  const botReq = HTTPS.request(options, res => {
    if (res.statusCode == 202) {
      console.log(`202${res.statusCode}`);
    } else {
      console.log(`rejecting bad status code ${res.statusCode}`);
    }
  });

  botReq.on('error', err => {
    console.log(`error posting message ${JSON.stringify(err)}`);
  });
  botReq.on('timeout', err => {
    console.log(`timeout posting message ${JSON.stringify(err)}`);
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
