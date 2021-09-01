import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

// import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();
const prisma = new PrismaClient();

usersRouter.get('/', async (request, response) => {
  const users = await prisma.user.findMany({
    include: {
      notes: true,
    },
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password, notes } = request.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      notes: {
        create: notes,
      },
    },
    include: {
      notes: true,
    },
  });

  return response.json(user);
});

// usersRouter.post('/', usersController.create);

export { usersRouter };
