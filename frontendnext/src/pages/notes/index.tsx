import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, SimpleGrid, Text, Button } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';

type NoteType = {
  id: string;
  title: string;
  description: string;
};

export default function Notes(): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [createNoteLoading, setCreateNoteLoading] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    async function loadNotes(): Promise<void> {
      try {
        const response = await api.get('/notes');

        setNotes(response.data);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  async function handleCreateNote(): Promise<void> {
    try {
      setCreateNoteLoading(true);

      const response = await api.post('/notes', {
        title: 'Untitled',
        description: '',
      });

      router.push(`/notes/${response.data.id}`);
    } finally {
      setCreateNoteLoading(false);
    }
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex h="100vh">
      <Sidebar />

      <Flex flexDir="column" w="100%">
        <Header />

        <Flex p="4">
          <Button
            type="button"
            colorScheme="pink"
            isLoading={createNoteLoading}
            onClick={handleCreateNote}
          >
            New note
          </Button>
        </Flex>

        <SimpleGrid columns={4}>
          {notes.map(note => (
            <Box
              as="button"
              key={note.id}
              onClick={() => router.push(`/notes/${note.id}`)}
              p="4"
              _hover={{ bg: 'gray.100' }}
            >
              {note.title}
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
