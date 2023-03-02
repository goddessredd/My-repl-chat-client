const io = require('socket.io-client');
const readline = require('readline');

var socket = io("https://My-repl-chat-server-1.1reddrogue.repl.co");

const chat_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var chat_handle = "";
var message_to_send = "";

socket.on('connect', function() {
  get_chat_handle();
  socket.on('broadcast', display_message);
});

function get_chat_handle() {
  chat_interface.question(
    "Hello! What's your chat handle? ",
    function(answer) {
      chat_handle = answer;
      socket.emit("message", chat_handle + " has entered the chat");
      chat();
    }
  );
}


function chat() {
  chat_interface.question(chat_handle + ": ", function(message) {
    message_to_send = chat_handle + ": " + message;
    socket.emit("message", message_to_send);
    chat();
  });
}

function display_message(message) {
  if (message_to_send != message) {
    console.log("\n" + message);
    chat();
  }
}