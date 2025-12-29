import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestError } from '../utils/error';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const dto = plainToInstance(dtoClass, req.body);
      const errors: ValidationError[] = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => {
          if (error.constraints) {
            return Object.values(error.constraints).join(', ');
          }
          return error.property;
        });
        throw new BadRequestError(errorMessages.join(', '));
      }

      req.body = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
