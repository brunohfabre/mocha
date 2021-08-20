import { useState, useEffect, useRef } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';

type ItemType = {
  id: string;
  content: string;
  tag: string;
};

type NoteType = {
  id: string;
  title: string;
  description: string;
  items: ItemType[];
  created_at: Date;
};

export default function Note(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const contentRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState<NoteType>({} as NoteType);

  useEffect(() => {
    async function loadNote(): Promise<void> {
      try {
        const response = await api.get(`/notes/${id}`);

        setNote(response.data);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadNote();
    }
  }, [id]);

  async function handleSave(): Promise<void> {
    if (contentRef.current) {
      try {
        const values = Object.values(contentRef.current?.childNodes).map(
          (item: any) => item.outerText,
        );

        await api.put(`/notes/${id}`, {
          items: values,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log(note.items);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex h="100vh">
      <Sidebar />

      <Flex flexDir="column" w="100%">
        <Header />

        <Heading>{note.title}</Heading>
        <Text color="gray.500">{note.description}</Text>

        <Flex
          ref={contentRef}
          flexDir="column"
          contentEditable
          outline="none"
          mt="8"
        >
          {note.items.length ? (
            note.items.map(item => <Box h="6">{item.content}</Box>)
          ) : (
            <Box h="6" />
          )}
        </Flex>

        <Flex>
          <Button type="button" colorScheme="pink" onClick={handleSave}>
            Salvar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
