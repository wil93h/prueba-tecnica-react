import { Request, Response } from 'express';
import { RegisterPersonUseCase } from '../../application/RegisterPersonUseCase';
import { GetPersonUseCase } from '../../application/GetPersonUseCase';
import { GetAllPersonsUseCase } from '../../application/GetAllPersonsUseCase';
import { UpdatePersonUseCase } from '../../application/UpdatePersonUseCase';
import { DeletePersonUseCase } from '../../application/DeletePersonUseCase';
import { MongoPersonRepository } from '../database/MongoPersonRepository';
import { z } from 'zod';

export class PersonController {
  private getRepository() {
    return new MongoPersonRepository();
  }

  async register(req: Request, res: Response) {
    try {
      const useCase = new RegisterPersonUseCase(this.getRepository());
      const personData = {
        ...req.body,
        docPhoto: req.file?.filename
      };
      const result = await useCase.execute(personData);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllPersonsUseCase(this.getRepository());
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const useCase = new GetPersonUseCase(this.getRepository());
      const result = await useCase.execute(req.params.id);
      result ? res.json(result) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const useCase = new UpdatePersonUseCase(this.getRepository());
      const personData = {
        ...req.body,
        ...(req.file?.filename && { docPhoto: req.file.filename })
      };
      const result = await useCase.execute(req.params.id, personData);
      result ? res.json(result) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const useCase = new DeletePersonUseCase(this.getRepository());
      const success = await useCase.execute(req.params.id);
      success ? res.status(204).send() : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        details: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    }
    
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
}