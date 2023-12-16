
const socket = io("http://localhost:7000", { transports: ["websocket"] });
const form = document.getElementById("sendMsg-container");
const messageInput = document.getElementById("msgInput");
const messageContainer = document.querySelector(".container");
const audio= new Audio('notification.mp3');

const append=(message,position)=>{
    const mesageElement= document.createElement('div');
    mesageElement.innerText=message;
    mesageElement.classList.add('message');
    mesageElement.classList.add(position);
    messageContainer.append(mesageElement);
    if(position=='left'){
// if message of any other user then only play the sound
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

const name = prompt("Enter your name to join the chat");
socket.emit("new-user-joined", name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

// receive messages on left
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on("left",name => {
  append(`${name} left the chat`, "right");
});