import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default class LoginVal {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const fields = login.validate({ email, password });
    if (fields.error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
