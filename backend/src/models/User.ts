import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  myList: mongoose.Types.ObjectId[];
  watchHistory: {
    movie: mongoose.Types.ObjectId;
    watchedAt: Date;
    progress: number;
  }[];
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    myList: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    watchHistory: [
      {
        movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
        watchedAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
