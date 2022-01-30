import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import ChatService from "../services/chat.js";

export default class ChatController {
  #service = new ChatService();

  chatPage = async (req, res, next) => {
    try {
      const chat = await this.#service
        .get({
          _id: req.params.id,
        })
        .populate("users");

      let messages = [];

      if (chat) {
        messages = await Message.find({ chat: chat._id }).populate("user");
      }

      const otherUser =
        chat.users[0]._id.toString() === req.session.user._id
          ? chat.users[1]
          : chat.users[0];

      res.render("chat", {
        user: req.session.user,
        title: "Chat",
        user2: otherUser,
        chat: chat._id,
        messages,
      });
    } catch (error) {
      next(error);
    }
  };

  initiliazeChat = async (req, res, next) => {
    const chat = await this.#service.get({
      $or: [
        { users: [req.session.user._id, req.headers.user] },
        { users: [req.headers.user, req.session.user._id] },
      ],
    });

    if (!chat) {
      const chat = await this.#service.save({
        users: [req.session.user._id, req.headers.user],
      });
      return res.status(200).send(`/chat/${chat._id}`);
    }

    res.status(200).send(`/chat/${chat._id}`);
  };
}
