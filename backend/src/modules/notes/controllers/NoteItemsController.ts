import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

import { Note } from '../entities/Note';
import { NoteItem } from '../entities/NoteItem';

export class NoteItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;
    const { items } = request.body;

    const notesRepository = getRepository(Note);
    const noteItemsRepository = getRepository(NoteItem);

    const note = await notesRepository.findOne(id);

    if (!note) {
      throw new AppError('Note not found.');
    }

    const noteItems: NoteItem[] = [];

    items.forEach((item: string) => {
      const noteItemCreated = noteItemsRepository.create({
        content: item,
        note_id: id,
        user_id,
        tag: '',
      });

      noteItems.push(noteItemCreated);
    });

    const noteItemsCreated = await noteItemsRepository.save(noteItems);

    return response.json(noteItemsCreated);
  }
}
