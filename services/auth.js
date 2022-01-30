import UserService from "./user.js";

export default class AuthService {
  async login(user) {
    const { name, password } = user;

    const userService = new UserService();

    return await userService.get({
      name,
      password,
    });
  }
}
