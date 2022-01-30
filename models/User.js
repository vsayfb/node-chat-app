import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    password: { type: String },
    chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    message: { type: mongoose.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
