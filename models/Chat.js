import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: { type: [mongoose.Types.ObjectId], ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);
