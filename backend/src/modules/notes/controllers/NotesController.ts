import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

import { Note } from '../entities/Note';
import { NoteItem } from '../entities/NoteItem';
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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const notesRepository = getRepository(Note);

    const notes = await notesRepository.findOne({
      where: {
        id,
        user_id,
      },
      relations: ['items'],
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;
    const { items } = request.body;

    const noteItemsRepository = getRepository(NoteItem);
    const notesRepository = getRepository(Note);

    const note = await notesRepository.findOne(id);

    if (!note) {
      throw new AppError('Note not found.');
    }

    const noteItemsToRemove = await noteItemsRepository.find({
      where: {
        note_id: id,
      },
    });

    if (noteItemsToRemove.length) {
      await noteItemsRepository.delete(noteItemsToRemove.map(item => item.id));
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
