import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error: ${err.message}`);
  logger.error(`Stack: ${err.stack}`);
  logger.error(`Request: ${req.method} ${req.url}`);
  logger.error(`Body: ${JSON.stringify(req.body)}`);

  if (err instanceof ZodError) {
    return res.status(400).json({
      type: 'VALIDATION_ERROR',
      errors: err.errors.map(e => ({
        path: e.path.length > 0 ? e.path.join('.') : 'unknown',
        message: e.message
      }))
    });
  }

  const knownErrors: Record<string, { status: number; message: string }> = {
    EMAIL_ALREADY_EXISTS: {
      status: 409,
      message: 'El correo electrónico ya está registrado'
    },
    IDENTIFICATION_ALREADY_EXISTS: {
      status: 409,
      message: 'El número de identificación ya está registrado'
    },
    INVALID_FILE_TYPE: {
      status: 400,
      message: 'Tipo de archivo no permitido'
    }
  };

  if (knownErrors[err.message]) {
    const { status, message } = knownErrors[err.message];
    return res.status(status).json({ error: message });
  }

  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
};