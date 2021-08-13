import { getRepository } from 'typeorm';

import { Note } from '../entities/Note';

interface IRequest {
  title: string;
  description: string;
  user_id: string;
}

export class CreateNoteService {
  public async execute({
    title,
    description,
    user_id,
  }: IRequest): Promise<Note> {
    const notesRepository = getRepository(Note);

    const note = notesRepository.create({
      title,
      description,
      user_id,
    });

    await notesRepository.save(note);

    return note;
  }
}
