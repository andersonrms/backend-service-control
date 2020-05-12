import { getRepository } from 'typeorm';
import User from '../../models/User';
import AppError from '../../error/AppError';

class DeleteUserServices {
  public async execute(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Users does not exists');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserServices;
