import User from "../models/User.js";

export default class UserService {
  save(doc) {
    return new User(doc).save();
  }
  get(where) {
    return User.findOne(where);
  }
}
