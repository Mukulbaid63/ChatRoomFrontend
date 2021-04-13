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
      document.querySelector("textarea").value = "";
      if (name === "Select your Username") alert("Select your Username!!!");
      else if (message === "") alert("Please enter a message!!!");
      else {
        let data = [];
        data.push(name);
        data.push("$$")
        data.push(message);
        data.push("$$")

        data.push(dateString);
        socket.send(`${data}`);
      }
});
document
  .querySelector("#chat-input")
  .addEventListener("keypress", function (evt) {
    if (evt.keyCode == 13) {
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
      document.querySelector("textarea").value = "";
      if (name === "Select your Username") alert("Select your Username!!!");
      else if (message === "") alert("Please enter a message!!!");
      else {
        let data = [];
        data.push(name);
        data.push("$$")
        data.push(message);
        data.push("$$")

        data.push(dateString);
        socket.send(`${data}`);
      }
    }
  });

socket.addEventListener("message", function (event) {

  if (event.data === "MAX LIMIT REACHED")
    alert(
      "The room is full, you are not allowed to chat but you can see the messages."
    );
  else {
    console.log(event.data);
    var nameArr = event.data.split(",$$,");
    console.log(nameArr);
    document.querySelector("#chat").innerHTML +=
      `<span style="word-wrap: break-word;"><span class="name">${nameArr[0]}</span>: <span class="message">${nameArr[1]}</span> <cite>${nameArr[2]}</cite></span>` +
      "<br/>";
  }
});
