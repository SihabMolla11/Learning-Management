import { Document, model, Schema } from "mongoose";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface UserDTO extends Document {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  password: string;
  user_role: UserRole;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<UserDTO>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    user_role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = model<UserDTO>("User", UserSchema);
export default User;
