import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

import { Note } from '../entities/Note';
import { CreateNoteService } from '../services/CreateNoteService';
import { UpdateSingleNoteService } from '../services/UpdateSingleNoteService';

export class NotesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const notesRepository = getRepository(Note);

    const notes = await notesRepository.find({
      where: {
        user_id: id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return response.json(notes);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const notesRepository = getRepository(Note);

    const notes = await notesRepository.findOne({
      where: {
        id,
        user_id,
      },
    });

    return response.json(notes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { title, content } = request.body;

    const createNoteService = new CreateNoteService();

    const note = await createNoteService.execute({
      title,
      content,
      user_id: id,
    });

    return response.json(note);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id } = request.params;

    const notesRepository = getRepository(Note);

    const note = await notesRepository.findOne(id);

    if (!note) {
      throw new AppError('Note not exists');
    }

    if (note.user_id !== userId) {
      throw new AppError('It is not possible to delete this note.');
    }

    await notesRepository.remove(note);

    return response.send(id);
  }

  public async updateSingle(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, field } = request.params;
    const { value } = request.body;

    if (field !== 'title' && field !== 'content') {
      throw new AppError('Field not title or content');
    }

    const updateSingleNoteService = new UpdateSingleNoteService();

    const note = await updateSingleNoteService.execute({
      id,
      field,
      value,
    });

    return response.json(note);
  }
}
