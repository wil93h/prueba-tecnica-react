import { IPersonRepository } from "../domain/repositories/IPersonRepository";
import { Person } from "../domain/entities/Person";

export class GetPersonUseCase {
  constructor(private readonly repository: IPersonRepository) {}
  
  async execute(id: string): Promise<Person | null> {
    return this.repository.findById(id);
  }
}