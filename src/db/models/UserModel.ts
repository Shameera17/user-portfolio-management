import mongoose, { model, Schema, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitle: { type: String, required: false },
  bio: { type: String, required: false },
  name: { type: String, required: false },
  provider: { type: String, required: false },
  avatarUrl: { type: String, required: false, default: null },
  avatarPath: { type: String, required: false, default: null },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function name(
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = models.User || model("User", UserSchema);
export default User;
