import UserService from "../services/user.js";

export default class UserController {
  #service = new UserService();

  save = async (req, res, next) => {
    try {
      const user = await this.#service.save(req.fields);
      req.session.user = user;
      return res.status(201).send("Created");
    } catch (error) {
      next(error);
    }
  };
}
