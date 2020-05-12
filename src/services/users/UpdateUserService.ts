import { getRepository } from 'typeorm';

import User from '../../models/User';
import AppError from '../../error/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const findUser = usersRepository.findOne(id);

    if (!findUser) {
      throw new AppError('Users does not exists');
    }

    const user = usersRepository.create({
      id,
      name,
      email,
      password,
    });

    await usersRepository.update({ id }, { name, email, password });

    return user;
  }
}

export default UpdateUserService;
