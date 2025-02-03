import { z } from 'zod';

export interface IPerson {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  tipoIdentificacion: 'CC' | 'CE' | 'PASAPORTE';
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
  telefono: z.string().min(8),
  tipoIdentificacion: z.enum(['CC', 'CE', 'PASAPORTE']),
  numeroIdentificacion: z.string().min(5),
  departamento: z.string().min(2),
  municipio: z.string().min(2),
  direccion: z.string().min(5),
  ingresosMensuales: z.number().positive(),
  docPhoto: z.string().optional()
});

export type Person = z.infer<typeof PersonSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};