import Chat from "../models/Chat.js";

export default class ChatService {
  save(chat) {
    return new Chat(chat).save();
  }
  get(where) {
    return Chat.findOne(where);
  }
}
