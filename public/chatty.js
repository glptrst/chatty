"use strict";

(() => {

  let username;

  let body = document.getElementsByTagName('body')[0];
  let usernameInput = document.createElement('input');
  usernameInput.autofocus = true;
  usernameInput.type = 'text';
  usernameInput.placeholder = 'username';
  usernameInput.id = 'usernameInput';
  body.appendChild(usernameInput);

  usernameInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      usernameInput.style.display = 'none';
      username = usernameInput.value;
      startChat(username);
    }
  });

  function startChat() {
    body.appendChild(renderChat());
    document.getElementById('messageInput').focus();

    const HOST = location.origin.replace(/^http/, 'ws');
    const ws = new WebSocket(HOST);

    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      //TODO: send connection request (to add user)
    };
    ws.onmessage = function(e) {
      //TODO
    };

    function renderChat() {
      let chat = document.createElement('div');
      let ul = document.createElement('ul');
      ul.id = 'messages';
      chat.appendChild(ul);

      let form = document.createElement('form');
      form.action = '';

      let input = document.createElement('input');
      input.id = 'messageInput';
      input.autocomplete = 'off';
      form.appendChild(input);
      chat.appendChild(form);

      form.addEventListener('submit', (e) => {
	e.preventDefault();
	ws.send(JSON.stringify({
	  user: username,
	  message: input.value
	}));
	document.getElementById('messageInput').value = '';
	document.getElementById('messageInput').focus();
      });
      return chat;
    }
  };

})();
