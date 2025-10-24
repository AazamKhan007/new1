// backend/src/middlewares/AuthRequest.ts

import type { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}
