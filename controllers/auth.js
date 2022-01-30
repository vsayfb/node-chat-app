import AuthService from "../services/auth.js";

export default class AuthController {
  #service = new AuthService();
  loginEvent = async (req, res, next) => {
    //
    const user = await this.#service.login({
      name: req.fields.name,
      password: req.fields.password,
    });

    if (user) {
      req.session.user = user;
      return res.status(200).json({ message: "Success" });
    } else
      return res.status(400).json({ message: "Wrong username or password!" });
  };
  loginPage(req, res, next) {
    res.render("login", { title: "Login" });
  }
  logoutEvent(req, res, next) {
    req.session.destroy();
    return res.redirect("/");
  }
  registerPage(req, res, next) {
    res.render("register", { title: "Register", user: null });
  }
}
