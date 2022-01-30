import express from "express";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import formidable from "express-formidable";
import mongoose from "mongoose";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import chat from "./routes/chat.js";
import session from "express-session";
import User from "./models/User.js";
import Notification from "./models/Notification.js";
import MongoStore from "connect-mongo";
import startSocket from "./services/socket.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve() + "/js")));

app.use(express.json());

//handle form data
app.use(formidable());

const sess = {
  secret: "keyboard cat",
  cookie: { maxAge: 36000000 },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB,
  }),
};

(async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("db ok");
  } catch (error) {
    console.log(error);
  }
})();

startSocket(server);

app.use(session(sess));

app.get("/", async (req, res) => {
  const users = await User.find({});

  const notifications = await Notification.find({
    target: req.session.user ? req.session.user._id : null,
  }).populate("origin");

  const user = { ...req.session.user, notifications };

  res.render("homepage", {
    title: "Homepage",
    user,
    users,
  });
});

app.use("/chat", chat);
app.use("/user", user);
app.use("/auth", auth);

server.listen(process.env.PORT || 3000);
console.log("server ok");
