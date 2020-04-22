"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

/*             */
/* HTTP SERVER */
/*             */
const server = http.createServer((req, res) => {

  let filePath = '.' + req.url;
  if (filePath === './')
    filePath = './index.html';

  let extname = String(path.extname(filePath)).toLowerCase();

  let mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  };
  
  let contentType = mimeTypes[extname];

  fs.readFile('./public/' + filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
	fs.readFile('./404.html', (error) => {
	  res.writeHead(404, {'Content-Type': 'text/html'});
	  res.end(content, 'utf-8');
	});
      } else {
	res.write(500);
	res.end(`Error: ${error.code}\n`);
      } 
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf-8');
    }
  });

}).listen(process.env.PORT || 9898);

/*                  */
/* WEBSOCKET SERVER */
/*                  */
const wss = new WebSocket.Server({ server });

let users = [];

wss.on('connection', (ws) => {
  ws.on('message', (req) => {
    req = JSON.parse(req);
    console.log(req);

    if (req.type === 'joinChat') {
      if (usernameExists(req.username)) { //TODO: further conditions?
	ws.send(JSON.stringify({
	  type: 'usernameTaken'
	}));
      } else {
	joinChat(ws, req.username);
      }
    } else if (req.type === 'message') {
      //TODO: conditions?
      message(req.content, req.username);
    }
  });

  ws.on('close', (e) => {
    disconnect(ws);
  });
});

function joinChat(ws, username) {
  let user = {ws: ws, username: username};
  users.push(user);
  
  ws.send(JSON.stringify({
    type: 'joinChat'
  }));
}

function message(message, username) {
  users.forEach((u) => { // send message to everyone
    u.ws.send(JSON.stringify({
      type: 'message',
      username: username,
      content: message
    }));
  });
}

function disconnect(ws) {
  users = users.filter( (u) => !(u.ws === ws) ); // remove user from users
}

function usernameExists(username) {
  return users.filter((u) => {
    return u.username === username;
  })[0];
}
