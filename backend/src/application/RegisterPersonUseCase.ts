import { IPersonRepository } from "../domain/repositories/IPersonRepository";
import { Person, PersonSchema } from "../domain/entities/Person";
import { z } from "zod";

export class RegisterPersonUseCase {
  constructor(private readonly repository: IPersonRepository) {}

  async execute(data: unknown): Promise<Person> {
    const validatedData = PersonSchema.parse(data);
    
    const [existingEmail, existingId] = await Promise.all([
      this.repository.findByEmail(validatedData.email),
      this.repository.findByIdentification(validatedData.numeroIdentificacion)
    ]);

    if (existingEmail) throw new Error('EMAIL_ALREADY_EXISTS');
    if (existingId) throw new Error('IDENTIFICATION_ALREADY_EXISTS');

    return this.repository.create(validatedData);
  }
}