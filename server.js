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

  var extname = String(path.extname(filePath)).toLowerCase();
  console.log(filePath);
  var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };
  
  var contentType = mimeTypes[extname] || 'application/octet-stream';

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

wss.on('connection', (ws) => {
  ws.on('message', (req) => {
    //TODO
  });

  ws.on('close', (e) => {
    //TODO
  });
});
