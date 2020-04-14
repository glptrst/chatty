"use strict";

(() => {

  let username;

  document.getElementsByTagName('body')[0].addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById('usernameInput').style.display = 'none';
      startChat(username);
    }
  });

  function startChat() {
    renderChat();

    const HOST = location.origin.replace(/^http/, 'ws');
    const ws = new WebSocket(HOST);

    ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    ws.onmessage = function(e) {
      //TODO
    };
  };

  function renderChat() {
    let body = document.getElementsByTagName('body')[0];
    let ul = document.createElement('ul');
    ul.id = 'messages';
    body.appendChild(ul);

    let form = document.createElement('form');
    form.action = '';
    let input = document.createElement('input');
    input.id = 'm';
    input.autocomplete = 'off';
    form.appendChild(input);
    body.appendChild(form);
    input.focus();
  }

})();
