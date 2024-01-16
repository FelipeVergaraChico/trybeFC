import User from '../database/models/User';
import IUser from '../Interfaces/user/Iuser';
import { IUModel } from '../Interfaces/user/IUModel';

export default class ModelUser implements IUModel {
  private model = User;

  async findUser(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
