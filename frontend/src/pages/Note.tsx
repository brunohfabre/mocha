import { useCallback, useEffect, useState, useContext } from 'react';

import debounce from 'lodash.debounce';
import ContentEditable from 'react-contenteditable';
import { useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import { Spin } from '../components/Spin';
import { NotesContext } from '../contexts/NotesContext';
import { api } from '../services/api';

interface ParamsData {
  id: string;
}

export function Note(): JSX.Element {
  const { isLoading, getNote, updateNote } = useContext(NotesContext);
  const { id } = useParams<ParamsData>();

  const [updateLoading, setUpdateLoading] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadNote(): Promise<void> {
      const response = await getNote(id);

      setTitle(response.title);
      setContent(response.content);
    }

    loadNote();
  }, [id]);

  useEffect(() => {
    if (title) {
      document.title = `${title} | Mocha`;
    } else {
      document.title = 'Untitled | Mocha';
    }
  }, [title]);

  async function changeTitleHandler(value: string) {
    const loadingId = uuidV4();

    try {
      setUpdateLoading(state => [...state, loadingId]);

      const response = await api.patch(`/notes/${id}/title`, { value });

      updateNote(response.data);
    } finally {
      setUpdateLoading(state => state.filter(item => item !== loadingId));
    }
  }

  async function changeContentHandler(value: string) {
    const loadingId = uuidV4();

    try {
      setUpdateLoading(state => [...state, loadingId]);

      const response = await api.patch(`/notes/${id}/content`, { value });

      updateNote(response.data);
    } finally {
      setUpdateLoading(state => state.filter(item => item !== loadingId));
    }
  }

  const debouncedChangeTitle = useCallback(
    debounce(changeTitleHandler, 300),
    [],
  );
  const debouncedChangeContent = useCallback(
    debounce(changeContentHandler, 300),
    [],
  );

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {isLoading ? (
        <>
          <section className="h-11 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-6 rounded-lg bg-gray-200 animate-pulse mt-4 max-w-md" />
          <div className="h-6 rounded-lg bg-gray-200 animate-pulse mt-2 max-w-sm" />
          <div className="h-6 rounded-lg bg-gray-200 animate-pulse mt-2 max-w-lg" />
          <div className="h-6 rounded-lg bg-gray-200 animate-pulse mt-2 max-w-xs" />
        </>
      ) : (
        <>
          <section className="flex justify-between items-center">
            <input
              type="text"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                debouncedChangeTitle(e.target.value);
              }}
              className="text-4xl font-semibold placeholder-gray-200 outline-none flex-1 h-11 w-full"
              placeholder="Untitled"
            />

            {!!updateLoading.length && <Spin fill="black" />}
          </section>

          <ContentEditable
            className="contenteditable mt-4 z-50 outline-none"
            data-placeholder="Type text here..."
            html={content}
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
              setContent(data);
              debouncedChangeContent(data);
            }}
            onChange={e => {
              const { value } = e.target;

              if (e.currentTarget.innerText === '\n') {
                setContent('');
                debouncedChangeContent('');
              } else {
                setContent(value);
                debouncedChangeContent(value);
              }
            }}
          />
        </>
      )}
    </div>
  );
}
