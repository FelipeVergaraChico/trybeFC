import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenVal {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = authorization.split(' ')[1];
    try {
      const decoded = verify(token, JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      if (req.method === 'GET') {
        req.body = decoded;
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
