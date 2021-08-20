import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

import { User } from '../entities/User';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class SessionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    if (!id) {
      throw new AppError('Token is missing to fetch user data.');
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword, token });
  }
}
