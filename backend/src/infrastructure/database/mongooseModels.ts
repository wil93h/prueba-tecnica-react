import mongoose, { Schema, Document } from 'mongoose';
import { Person } from '../../domain/entities/Person';

export interface IPersonDocument extends Omit<Person, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PersonSchema = new Schema<IPersonDocument>({

}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const PersonModel = mongoose.model<IPersonDocument>('Person', PersonSchema);