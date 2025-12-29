import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { IS_PUBLIC_ROUTE } from 'src/decorators/public.decorator';

export const publicRouteGuard = (req: Request, res: Response, next: NextFunction) => {
  const stack = req.route?.stack || [];
  for (const layer of stack) {
    if (layer.handle && Reflect.getMetadata(IS_PUBLIC_ROUTE, layer.handle)) {
      (req as any)._skipAuth = true;
      return next();
    }
  }
  next();
};