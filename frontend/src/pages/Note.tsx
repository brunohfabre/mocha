import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash.debounce';
import ContentEditable from 'react-contenteditable';
import { useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import { Spin } from '../components/Spin';
import { api } from '../services/api';

interface ParamsData {
  id: string;
}

type ItemType = {
  id: string;
  content: string;
};

type NoteType = {
  created_at: string;
  description: string;
  id: string;
  items: ItemType[];
  title: string;
  updated_at: string;
  user_id: string;
};

export function Note(): JSX.Element {
  const { id } = useParams<ParamsData>();

  const [updateLoading, setUpdateLoading] = useState<string[]>([]);
  const [note, setNote] = useState<NoteType>({} as NoteType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    document.title = 'Note | Mocha';

    async function loadNote(): Promise<void> {
      const response = await api.get(`/notes/${id}`);

      setNote(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    }

    loadNote();
  }, [id]);

  async function changeTitleHandler(value: string) {
    const loadingId = uuidV4();

    try {
      setUpdateLoading(state => [...state, loadingId]);

      await api.patch(`/notes/${id}/title`, { value });
    } finally {
      setUpdateLoading(state => state.filter(item => item !== loadingId));
    }
  }
  async function changeContentHandler(value: string) {
    const loadingId = uuidV4();

    try {
      setUpdateLoading(state => [...state, loadingId]);

      await api.patch(`/notes/${id}/content`, { value });
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

  if (!note.id) {
    return <h3>loading...</h3>;
  }

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <section className="flex justify-between items-center">
        <input
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            debouncedChangeTitle(e.target.value);
          }}
          className="text-4xl font-semibold placeholder-gray-200 outline-none"
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
          const value = e.target.value
            .replaceAll('<div>', '<br>')
            .replaceAll('</div>', '');

          setContent(value);
          debouncedChangeContent(value);
        }}
      />
    </div>
  );
}
