import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Types.ObjectId },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
