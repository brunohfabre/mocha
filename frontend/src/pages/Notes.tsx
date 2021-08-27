import { useEffect, useState, useRef, useContext } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { NotesContext, NoteType } from '../contexts/NotesContext';

export function Notes(): JSX.Element {
  const { isLoading, notes, loadNotes, isCreateLoading, createNote } =
    useContext(NotesContext);

  const formRef = useRef<FormHandles>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const history = useHistory();

  // const [loading, setLoading] = useState(false);
  // const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    document.title = 'Notes | Mocha';

    loadNotes();

    // async function loadNotes(): Promise<void> {
    //   const response = await api.get('/notes');

    //   setNotes(response.data);
    // }

    // loadNotes();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!contentRef.current?.contains(event.target)) {
        const title = formRef.current?.getFieldValue('title');

        if (title) {
          formRef.current?.submitForm();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handleCreateNote(): Promise<void> {
    const id = await createNote();

    history.push(`/notes/${id}`);
  }

  if (isLoading) {
    return <p>loading notes</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex justify-end">
        <Button
          type="button"
          onClick={handleCreateNote}
          color="primary"
          isLoading={isCreateLoading}
        >
          New note
        </Button>
      </header>

      <section className="mt-4 grid grid-cols-5 gap-2">
        {notes.map(note => (
          <button
            type="button"
            onClick={() => history.push(`/notes/${note.id}`)}
            className="p-4 bg-white shadow-sm border rounded-lg text-left flex items-start hover:bg-gray-50 h-24 transition"
          >
            {note.title}
          </button>
        ))}
      </section>
    </div>
  );
}
