import { IPersonRepository } from "../domain/repositories/IPersonRepository";

export class DeletePersonUseCase {
  constructor(private readonly repository: IPersonRepository) {}
  
  async execute(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}