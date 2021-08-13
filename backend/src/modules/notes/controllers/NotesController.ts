import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Note } from '../entities/Note';
import { CreateNoteService } from '../services/CreateNoteService';

export class NotesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const notesRepository = getRepository(Note);

    const notes = await notesRepository.find({
      where: {
        user_id: id,
      },
    });

    return response.json(notes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { title, description } = request.body;

    const createNoteService = new CreateNoteService();

    const note = await createNoteService.execute({
      title,
      description,
      user_id: id,
    });

    return response.json(note);
  }
}
