import { useCallback, useEffect, useState, useRef } from 'react';

import debounce from 'lodash.debounce';
import ContentEditable from 'react-contenteditable';
import { useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

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

function Item({
  item,
  itemsLength,
  setItems,
  focus,
}: {
  item: { id: string; content: string };
  itemsLength: number;
  setItems: any;
  focus: boolean;
}): JSX.Element {
  const contentRef = useRef<any>(null);

  const [content, setContent] = useState(item.content);

  useEffect(() => {
    if (focus) {
      contentRef.current.el.current.focus();

      const range = document.createRange();
      range.selectNodeContents(contentRef.current.el.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [focus]);

  useEffect(() => {
    contentRef.current.el.current.selectionStart = item.content.length;
    contentRef.current.el.current.selectionEnd = item.content.length;
  }, [item.content]);

  return (
    // <div
    //   contentEditable
    //   className="bg-gray-100 mt-4"
    //   onKeyPress={e => console.log(e)}
    // >
    //   {content}
    // </div>
    <ContentEditable
      ref={contentRef}
      className="bg-gray-100 mt-4"
      html={content}
      // onPaste={e => {
      //   e.preventDefault();
      //   const clipboardData = e.clipboardData
      //     .getData('text/plain')
      //     .split('\n');

      //   let data = '';

      //   clipboardData.forEach(item => {
      //     if (data) {
      //       data = `${data}<br>${item}`;
      //     } else {
      //       data = item;
      //     }
      //   });
      //   setContent(data);
      //   debouncedChangeContent(data);
      // }}
      onChange={e => {
        const { value } = e.target;

        if (!value) {
          setContent('<br class="empty">');

          contentRef.current.el.current.className = `${contentRef.current.el.current.className} empty`;
        } else {
          setContent(value);
        }

        // setContent(value);
        // debouncedChangeContent(value);
      }}
      onKeyPress={e => {
        if (e.code === 'Enter') {
          e.preventDefault();

          setItems((state: any) => [
            ...state,
            { id: uuidV4(), content: '<br class="empty">' },
          ]);
        }
      }}
      onKeyDown={(e: any) => {
        if (e.code === 'Backspace') {
          if (
            itemsLength > 1 &&
            e.target?.firstChild.className?.includes('empty')
          ) {
            setItems((state: any) =>
              state.filter((st: any) => st.id !== item.id),
            );
          }
        }
      }}
    />
  );
}

export function Note(): JSX.Element {
  const { id } = useParams<ParamsData>();

  const [note, setNote] = useState<NoteType>({} as NoteType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [items, setItems] = useState([
    { id: uuidV4(), content: 'item 1' },
    { id: uuidV4(), content: 'item 2' },
    { id: uuidV4(), content: 'item 3' },
    { id: uuidV4(), content: 'item 4' },
  ]);
  const [focus, setFocus] = useState<number>();

  useEffect(() => {
    setFocus(items.length - 1);
  }, [items]);

  useEffect(() => {
    async function loadNote(): Promise<void> {
      const response = await api.get(`/notes/${id}`);

      setNote(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    }

    loadNote();
  }, [id]);

  // const changeTitleHandler = async (value: string) => {
  //   await api.patch(`/notes/${id}/title`, { value });
  // };
  // const changeContentHandler = async (value: string) => {
  //   await api.patch(`/notes/${id}/content`, { value });
  // };

  // const debouncedChangeTitle = useCallback(
  //   debounce(changeTitleHandler, 300),
  //   [],
  // );
  // const debouncedChangeContent = useCallback(
  //   debounce(changeContentHandler, 300),
  //   [],
  // );

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
          // debouncedChangeTitle(e.target.value);
        }}
        className="bg-gray-100"
      />

      {items.map((item, index) => (
        <Item
          key={item.id}
          item={item}
          itemsLength={items.length}
          setItems={setItems}
          focus={index === focus}
        />
      ))}
    </div>
  );
}
