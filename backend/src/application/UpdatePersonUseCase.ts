import { IPersonRepository } from "../domain/repositories/IPersonRepository";
import { Person, PersonSchema } from "../domain/entities/Person";
import { z } from "zod";

export class UpdatePersonUseCase {
  constructor(private readonly repository: IPersonRepository) {}
  
  async execute(id: string, data: unknown): Promise<Person | null> {
    const validatedData = PersonSchema.partial().parse(data);
    return this.repository.update(id, validatedData);
  }
}