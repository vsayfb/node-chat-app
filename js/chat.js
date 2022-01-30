const form = document.getElementById("form");
const stat = document.getElementById("status");
const input = document.getElementById("input");
const origin = document.getElementById("origin").value;
const target = document.getElementById("target").value;
const chat = document.getElementById("chat").value;
const originName = document.getElementById("originName").value;
const targetName = document.getElementById("targetName").value;
const messages = document.getElementById("messages");
const socket = io({ query: { chat, origin } });

let timer;

function handleKeyDown(e) {
  socket.emit("typing", true);
  clearTimeout(timer);
  timer = setTimeout(() => {
    socket.emit("typing", false);
  }, 500);
}

socket.emit("join", origin);

socket.on("onlines", (onlines) => {
  if (onlines[target] === "online") stat.innerText = "online";
});

socket.on("typing", (typing) => {
  if (typing) stat.innerText = "typing";
  else stat.innerText = "online";
});

socket.on("left", (msg) => {
  stat.innerText = "offline";
});

function handleSubmit(e) {
  e.preventDefault();

  if (input.value) {
    const data = {
      origin,
      target,
      text: input.value,
      originName,
    };

    socket.emit("chat message", data);
    input.value = "";
  }
}

socket.on("response", function (data) {
  const item = document.createElement("li");

  item.innerHTML = `<li class="list-group-item">
          <span class="text-success">${data.user}</span>
          <b>${data.text}</b>
          </li>`;

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
