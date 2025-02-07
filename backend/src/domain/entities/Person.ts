import { z } from 'zod';

export interface IPerson {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  departamento: string;
  municipio: string;
  direccion: string;
  ingresosMensuales: number;
  docPhoto?: string;
}

export const PersonSchema = z.object({
  nombres: z.string().min(2),
  apellidos: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(2),
  tipoIdentificacion: z.string(),
  numeroIdentificacion: z.string(),
  departamento: z.string().min(2),
  municipio: z.string().min(2),
  direccion: z.string().min(2),
  ingresosMensuales: z.number().positive(),
  docPhoto: z.string().optional()
});

export type Person = z.infer<typeof PersonSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};