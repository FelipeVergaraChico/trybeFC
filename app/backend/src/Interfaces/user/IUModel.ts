import IUser from './Iuser';

export interface IUModel {
  findUser(email: string): Promise<IUser | null>;
}
