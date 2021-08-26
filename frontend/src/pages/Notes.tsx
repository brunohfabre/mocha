import { useEffect, useState, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button } from '../components/Button';
import { Input } from '../components/Form/Input';
import getValidationErrors from '../helpers/getValidationErrors';
import { api } from '../services/api';

type NoteType = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

interface FormData {
  content: string;
}

export function Notes(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    document.title = 'Notes | Mocha';

    async function loadNotes(): Promise<void> {
      const response = await api.get('/notes');

      setNotes(response.data);
    }

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

  async function handleCreateNewNote(): Promise<void> {
    try {
      setLoading(true);

      const response = await api.post('/notes', {
        title: '',
        content: '',
      });

      history.push(`/notes/${response.data.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex justify-end">
        <Button
          type="button"
          onClick={handleCreateNewNote}
          color="primary"
          isLoading={loading}
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
