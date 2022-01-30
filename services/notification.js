import Notification from "../models/Notification.js";

export default class NotificationService {
  save(not) {
    return new Notification(not).save();
  }
  update(_id, doc) {
    return Notification.findByIdAndUpdate(_id, { $set: doc });
  }
  get(where) {
    return Notification.findOne(where);
  }
}
