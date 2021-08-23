import { useEffect, useState, useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import debounce from 'lodash.debounce';
import ContentEditable from 'react-contenteditable';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button } from '../components/Button';
import { Input } from '../components/Form/Input';
import { Modal } from '../components/Modal';
import { Spin } from '../components/Spin';
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
  title: string;
}

export function Notes(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [note, setNote] = useState<NoteType | null>(null);

  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  useEffect(() => {
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

  function handleCloseModal(): void {
    setNote(null);
    setTitleInput('');
    setContentInput('');
  }

  async function handleSubmit(data: FormData): Promise<void> {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { title } = data;

      const response = await api.post('/notes', {
        title,
        content: '',
      });

      setNotes([response.data, ...notes]);

      setNote(response.data);
      setTitleInput(response.data.title);

      formRef.current?.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      toast.error(err.data?.message);
    } finally {
      setLoading(false);
    }
  }

  async function changeTitleHandler(value: string): Promise<void> {
    try {
      setUpdateLoading(true);

      const response = await api.patch(`/notes/${note?.id}/title`, { value });

      setNotes(
        notes.map(item =>
          item.id === response.data.id ? response.data : item,
        ),
      );
    } finally {
      setUpdateLoading(false);
    }
  }

  async function changeContentHandler(value: string): Promise<void> {
    try {
      setUpdateLoading(true);

      const response = await api.patch(`/notes/${note?.id}/content`, { value });

      setNotes(
        notes.map(item =>
          item.id === response.data.id ? response.data : item,
        ),
      );
    } finally {
      setUpdateLoading(false);
    }
  }

  const debouncedChangeTitle = useCallback(debounce(changeTitleHandler, 300), [
    note,
  ]);
  const debouncedChangeContent = useCallback(
    debounce(changeContentHandler, 300),
    [note],
  );

  function handleSelectNote(item: NoteType): void {
    setNote(item);
    setTitleInput(item.title);
    setContentInput(item.content);
  }

  return (
    <>
      <Modal isOpen={!!note} onRequestClose={handleCloseModal}>
        <header className="flex justify-between h-8 items-center">
          <input
            type="text"
            value={titleInput}
            onChange={e => {
              setTitleInput(e.target.value);
              debouncedChangeTitle(e.target.value);
            }}
            className="bg-gray-100"
          />
          {updateLoading && <Spin fill="black" />}
        </header>
        <ContentEditable
          className="bg-gray-100 mt-4"
          html={contentInput}
          onPaste={e => {
            e.preventDefault();
            const clipboardData = e.clipboardData
              .getData('text/plain')
              .split('\n');

            let data = '';

            clipboardData.forEach(item => {
              if (data) {
                data = `${data}<br>${item}`;
              } else {
                data = item;
              }
            });
            setContentInput(data);
            debouncedChangeContent(data);
          }}
          onChange={e => {
            const value = e.target.value
              .replaceAll('<div>', '<br>')
              .replaceAll('</div>', '');

            setContentInput(value);
            debouncedChangeContent(value);
          }}
        />
      </Modal>

      <div>
        <header className="flex justify-center">
          <div
            ref={contentRef}
            className="bg-white rounded-lg border p-4 mt-4 shadow-sm"
          >
            <Form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
              <Input name="title" className="w-96" />
              <Button type="submit" color="primary" isLoading={loading}>
                Add
              </Button>
            </Form>
          </div>
        </header>

        {notes.map(item => (
          <button
            type="button"
            onClick={() => handleSelectNote(item)}
            className="p-4 hover:bg-red-400"
          >
            {item.title}
          </button>
        ))}
      </div>
    </>
  );
}
