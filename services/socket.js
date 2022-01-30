import { Server } from "socket.io";
import MessageService from "./message.js";
import NotificationService from "./notification.js";

const notification = new NotificationService();
const message = new MessageService();

let onlines = {};

export default function startSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    const { chat, origin } = socket.handshake.query;

    socket.join(chat);

    socket.on("join", (user) => {
      onlines[user] = "online";
      io.to(chat).emit("onlines", onlines);
    });

    socket.on("typing", (typing) => {
      if (typing) socket.broadcast.to(chat).emit("typing", true);
      else socket.broadcast.to(chat).emit("typing", false);
    });

    socket.on("chat message", async (data) => {
      try {
        const { origin, originName, target, text } = data;

        await message.save({ user: origin, chat, text });

        io.to(chat).emit("response", {
          text,
          user: originName,
        });

        if (onlines[data.target] !== "online") {
          const same = await notification.get({
            origin,
            target,
          });

          if (same) await notification.update(same._id, { text });
          else {
            notification.save({
              origin: data.origin,
              target: data.target,
              event: `/chat/${chat}`,
              text: data.text,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      delete onlines[origin];
      io.to(chat).emit("left", "left.");
    });
  });
}
