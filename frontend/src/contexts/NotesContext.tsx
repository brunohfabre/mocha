import React, { ReactNode, createContext, useState } from 'react';

import { api } from '@services/api';

export type NoteType = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

type NotesContextType = {
  isLoading: boolean;
  isDeleteLoading: boolean;
  isCreateLoading: boolean;
  notes: NoteType[];
  loadNotes: () => void;
  getNote: (id: string) => Promise<NoteType>;
  updateNote: (note: NoteType) => void;
  createNote: () => Promise<string>;
  deleteNote: (id: string) => Promise<void>;
};

export const NotesContext = createContext({} as NotesContextType);

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  async function loadNotes(): Promise<void> {
    if (notes.length) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.get('/notes');

      setNotes(response.data);
    } finally {
      setIsLoading(false);
    }
  }

  async function getNote(id: string): Promise<NoteType> {
    const findNote = notes.find(note => note.id === id);

    if (findNote) {
      return findNote;
    }

    try {
      setIsLoading(true);

      const response = await api.get(`/notes/${id}`);

      return response.data;
    } finally {
      setIsLoading(false);
    }
  }

  function updateNote(note: NoteType): void {
    setNotes(notes.map(item => (item.id === note.id ? note : item)));
  }

  async function createNote(): Promise<string> {
    try {
      setIsCreateLoading(true);

      const response = await api.post('/notes', {
        title: '',
        content: '',
      });

      setNotes([...notes, response.data]);

      return response.data.id;
    } finally {
      setIsCreateLoading(false);
    }
  }

  async function deleteNote(id: string): Promise<void> {
    try {
      setIsDeleteLoading(true);

      await api.delete(`/notes/${id}`);

      setNotes(notes.filter(note => note.id !== id));
    } finally {
      setIsDeleteLoading(false);
    }
  }

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        isDeleteLoading,
        isCreateLoading,
        notes,
        loadNotes,
        getNote,
        updateNote,
        createNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
