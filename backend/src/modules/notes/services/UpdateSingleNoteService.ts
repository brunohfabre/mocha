import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

import { Note } from '../entities/Note';

interface IRequest {
  id: string;
  field: 'title' | 'content';
  value: string;
}

export class UpdateSingleNoteService {
  public async execute({ id, field, value }: IRequest): Promise<Note> {
    const notesRepository = getRepository(Note);

    const note = await notesRepository.findOne(id);

    if (!note) {
      throw new AppError(`Note not found to update ${field}`);
    }

    note[field] = value;

    await notesRepository.save(note);

    return note;
  }
}
