import { Router } from 'express';

const notesRouter = Router();

notesRouter.get('/', (request, response) => {
  return response.json({ notes: true });
});

export { notesRouter };
