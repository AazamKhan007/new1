// backend/src/middlewares/checkAuth.ts

// Using 'import type' is safe because it's only for TypeScript and is erased at runtime.
import type { Response, NextFunction } from 'express';
// import type { AuthRequest } from './AuthRequest'; // Removed to avoid conflict
import type { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    [key: string]: any; // Add other user properties if needed
  };
}

// Using 'require' for actual JavaScript modules, which matches the project setup.
import { createClient } from '@supabase/supabase-js';

// We only need the public client here to verify the token
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

/**
 * Middleware to verify the JWT token by making an API call to Supabase.
 */
const checkAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided.' });
    }
    const token = authHeader.split(' ')[1];

    // 2. Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    // 3. If token is valid, attach user to the request and proceed
    req.user = user;
    next(); // Go to the next function (the controller)

  } catch (error: any) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({ error: 'Unauthorized: An error occurred.' });
  }
};

// Using 'module.exports' which is the standard way to export in CommonJS.
export { checkAuth };
