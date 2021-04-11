// const socket = new WebSocket("ws://localhost:8080/");
const socket = new WebSocket("wss://otmchatroom.herokuapp.com/");

let currentDayOfMonth = 0;
let currentMonth = 0;
let currentYear = 0;
let time = 0;
let dateString = "";

document.querySelector("button").addEventListener("click", function () {
  const currentDate = new Date();

  currentDayOfMonth = currentDate.getDate();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  time = currentDate.toLocaleTimeString();
  dateString =
    time +
    " " +
    currentDayOfMonth +
    "-" +
    (currentMonth + 1) +
    "-" +
    currentYear;
  const message = document.querySelector("#util-1 #chat-input").value;
  const name = document.querySelector("#util-1 #name-input").value;
  document.querySelector("textarea").value=""

  if (name === "Select your Username") alert("Select your Username!!!");
  else if (message === "") alert("Please enter a message!!!");
  else {
    let data = [];
    data.push(name);
    data.push(message);
    data.push(dateString);
    socket.send(`${data}`);
  }
});
document.querySelector("#chat-input").addEventListener('keypress',function (evt) {
  if(evt.keyCode==13){
  const currentDate = new Date();

  currentDayOfMonth = currentDate.getDate();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  time = currentDate.toLocaleTimeString();
  dateString =
    time +
    " " +
    currentDayOfMonth +
    "-" +
    (currentMonth + 1) +
    "-" +
    currentYear;
  const message = document.querySelector("#util-1 #chat-input").value;
  const name = document.querySelector("#util-1 #name-input").value;
  document.querySelector("textarea").value=""
  if (name === "Select your Username") alert("Select your Username!!!");
  else if (message === "") alert("Please enter a message!!!");
  else {
    let data = [];
    data.push(name);
    data.push(message);
    data.push(dateString);
    socket.send(`${data}`);
  }
}})

socket.addEventListener("message", function (event) {
  if (
    event.data ===
    "MAX LIMIT REACHED"
  )
    alert(
      "The room is full, you are not allowed to chat but you can see the messages."
    );
  else {
    document.querySelector("#chat").innerHTML +=
      `<span><span class="name">${event.data.substring(
        0,
        5
      )}</span>: <span class="message">${event.data.substring(
        6,
        event.data.length - 21
      )}</span> <cite>${event.data.substring(
        event.data.length - 20
      )}</cite></span>` + "<br/>";
  }
});
