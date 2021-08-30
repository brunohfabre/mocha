import { Router } from 'express';

import { NotesController } from '../controllers/NotesController';

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.get('/', notesController.index);
notesRouter.get('/:id', notesController.show);
notesRouter.post('/', notesController.create);
notesRouter.delete('/:id', notesController.delete);

notesRouter.patch('/:id/:field', notesController.updateSingle);

export { notesRouter };
