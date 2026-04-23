import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  isEmailVerified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    image: {
      type: String,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
