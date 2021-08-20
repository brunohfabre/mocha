import { Router } from 'express';

import { NoteItemsController } from '../controllers/NoteItemsController';
import { NotesController } from '../controllers/NotesController';

const notesRouter = Router();
const notesController = new NotesController();
const noteItemsController = new NoteItemsController();

notesRouter.get('/', notesController.index);
notesRouter.get('/:id', notesController.show);
notesRouter.post('/', notesController.create);
notesRouter.put('/:id', notesController.update);

notesRouter.post('/:id/items', noteItemsController.create);

export { notesRouter };
