import { Person } from "../entities/Person"

export interface IPersonRepository {
  create(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person>;
  findById(id: string): Promise<Person | null>;
  update(id: string, person: Partial<Person>): Promise<Person | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<Person | null>;
  findByIdentification(numero: string): Promise<Person | null>;
}