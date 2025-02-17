import mongoose, { Document, Schema } from "mongoose";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface userDTO extends Document {
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

const UserSchema: Schema = new Schema(
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

export default mongoose.model<userDTO>("User", UserSchema);
