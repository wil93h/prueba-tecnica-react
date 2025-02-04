import { IPersonRepository } from "../../domain/repositories/IPersonRepository";
import { Person } from "../../domain/entities/Person";
import { PersonModel } from "./mongooseModels";

export class MongoPersonRepository implements IPersonRepository {
  async create(person: Omit<Person, 'id'>): Promise<Person> {
    const newPerson = await PersonModel.create(person);
    return this.mapToDomain(newPerson.toObject());
  }

  async findById(id: string): Promise<Person | null> {
    const person = await PersonModel.findById(id).lean();
    return person ? this.mapToDomain(person) : null;
  }

  async findAll(): Promise<Person[]> {
    const persons = await PersonModel.find().lean();
    return persons.map(this.mapToDomain);
  }

  async update(id: string, person: Partial<Person>): Promise<Person | null> {
    const updated = await PersonModel.findByIdAndUpdate(id, person, { new: true }).lean();
    return updated ? this.mapToDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await PersonModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByEmail(email: string): Promise<Person | null> {
    const person = await PersonModel.findOne({ email }).lean();
    return person ? this.mapToDomain(person) : null;
  }

  async findByIdentification(numero: string): Promise<Person | null> {
    const person = await PersonModel.findOne({ numeroIdentificacion: numero }).lean();
    return person ? this.mapToDomain(person) : null;
  }

  private mapToDomain(raw: any): Person {
    return {
      id: raw._id.toString(),
      nombres: raw.nombres,
      apellidos: raw.apellidos,
      email: raw.email,
      telefono: raw.telefono,
      tipoIdentificacion: raw.tipoIdentificacion,
      numeroIdentificacion: raw.numeroIdentificacion,
      departamento: raw.departamento,
      municipio: raw.municipio,
      direccion: raw.direccion,
      ingresosMensuales: raw.ingresosMensuales,
      docPhoto: raw.docPhoto,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    };
  }
}