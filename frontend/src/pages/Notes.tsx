import { useEffect, useRef, useContext } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { NotesContext } from '../contexts/NotesContext';

export function Notes(): JSX.Element {
  const { isLoading, notes, loadNotes, isCreateLoading, createNote } =
    useContext(NotesContext);

  const formRef = useRef<FormHandles>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const history = useHistory();

  useEffect(() => {
    document.title = 'Notes | Mocha';

    loadNotes();
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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex justify-end">
        <Button
          type="button"
          onClick={handleCreateNote}
          color="primary"
          isLoading={isCreateLoading}
          disabled={isLoading}
        >
          New note
        </Button>
      </header>

      {isLoading ? (
        <section className="mt-4 grid grid-cols-5 gap-2">
          <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
        </section>
      ) : (
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
      )}
    </div>
  );
}
