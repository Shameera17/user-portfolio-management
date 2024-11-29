import { model, Schema, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define an interface for User Document
export interface IUser extends Document {
  email: string;
  password?: string;
  jobTitle?: string;
  bio?: string;
  name?: string;
  provider?: string;
  avatarUrl?: string | null;
  avatarPath?: string | null;
  username?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    jobTitle: { type: String, required: false },
    bio: { type: String, required: false },
    name: { type: String, required: false },
    provider: { type: String, required: false },
    avatarUrl: { type: String, required: false, default: null },
    avatarPath: { type: String, required: false, default: null },
    username: { type: String, required: false },
  },
  { timestamps: true }
);

// Pre-save middleware for hashing password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.password) return next();
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model with typing
const User = models.User || model<IUser>("User", UserSchema);
export default User;
