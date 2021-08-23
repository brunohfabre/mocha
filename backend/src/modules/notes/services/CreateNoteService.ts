import { getRepository } from 'typeorm';

import { Note } from '../entities/Note';

interface IRequest {
  title: string;
  content: string;
  user_id: string;
}

export class CreateNoteService {
  public async execute({ title, content, user_id }: IRequest): Promise<Note> {
    const notesRepository = getRepository(Note);

    const note = notesRepository.create({
      title,
      content,
      user_id,
    });

    await notesRepository.save(note);

    return note;
  }
}
