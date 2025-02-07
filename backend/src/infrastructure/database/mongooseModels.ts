import mongoose, { Schema } from 'mongoose';
import { Person } from '../../domain/entities/Person';

type IPersonDocument = Omit<Person, 'id'> & mongoose.Document;

const PersonSchema = new Schema<IPersonDocument>({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  tipoIdentificacion: { type: String, required: true},
  numeroIdentificacion: { type: String, required: true, unique: true },
  departamento: { type: String, required: true },
  municipio: { type: String, required: true },
  direccion: { type: String, required: true },
  ingresosMensuales: { type: Number, required: true },
  docPhoto: { type: String }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const PersonModel = mongoose.model<IPersonDocument>('Person', PersonSchema);