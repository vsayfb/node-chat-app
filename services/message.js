import Message from "../models/Message.js";

export default class MessageService {
  save(message) {
    return new Message(message).save();
  }
}
