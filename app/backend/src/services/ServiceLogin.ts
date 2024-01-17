import * as bcrypt from 'bcryptjs';
import * as Joi from 'joi';
import { sign } from 'jsonwebtoken';
import { ResponseMessageToken, Response } from '../Interfaces/Response';
import ModelUser from '../model/ModelUser';

const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class ServiceUser {
  constructor(private modelUser = new ModelUser()) {}

  public async login(email: string, password: string):
  Promise<Response<ResponseMessageToken>> {
    const user = await this.modelUser.findUser(email);
    const validate = Schema.validate({ email, password });
    if (validate.error) {
      return { statusCode: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const { username, role } = user;
      const token = sign({ username, role, email: user.email }, JWT_SECRET);
      return { statusCode: 'SUCESSFULL', data: { token } };
    }

    return { statusCode: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }
}
