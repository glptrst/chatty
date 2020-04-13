"use strict";

(() =>{
  const HOST = location.origin.replace(/^http/, 'ws');
  const ws = new WebSocket(HOST);

  ws.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  ws.onmessage = function(e) {
    //TODO
  };
})();
