import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    origin: { type: mongoose.Types.ObjectId, ref: "User" },
    target: { type: mongoose.Types.ObjectId, ref: "User" },
    event: { type: String },
    text: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Notification", NotificationSchema);
