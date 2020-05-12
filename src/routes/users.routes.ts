import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/users/CreateUserService';
import UpdateUserService from '../services/users/UpdateUserService';
import DeleteUserService from '../services/users/DeleteUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({ id, name, email, password });

  return response.json(user);
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteUserService = new DeleteUserService();

  await deleteUserService.execute(id);

  return response.status(204).send();
});

export default usersRouter;
