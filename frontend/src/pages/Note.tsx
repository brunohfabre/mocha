import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash.debounce';
import ContentEditable from 'react-contenteditable';
import { useParams } from 'react-router-dom';

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

  const [note, setNote] = useState<NoteType>({} as NoteType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadNote(): Promise<void> {
      const response = await api.get(`/notes/${id}`);

      setNote(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    }

    loadNote();
  }, [id]);

  const changeTitleHandler = async (value: string) => {
    await api.patch(`/notes/${id}/title`, { value });
  };
  const changeContentHandler = async (value: string) => {
    await api.patch(`/notes/${id}/content`, { value });
  };

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
    <div className="p-4">
      <input
        type="text"
        value={title}
        onChange={e => {
          setTitle(e.target.value);
          debouncedChangeTitle(e.target.value);
        }}
        className="bg-gray-100"
      />
      <ContentEditable
        className="bg-gray-100 mt-4"
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
