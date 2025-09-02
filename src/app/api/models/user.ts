import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    address?: string;
    role: UserRole;
}

export enum UserRole {
    user = 0,
    admin = 1,
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    role: { type: Number, enum: [UserRole.user, UserRole.admin], default: UserRole.user },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
