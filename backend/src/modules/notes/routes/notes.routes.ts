import { Router } from 'express';

import { NotesController } from '../controllers/NotesController';

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.get('/', notesController.index);

notesRouter.post('/', notesController.create);

export { notesRouter };
