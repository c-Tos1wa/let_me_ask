import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

//todos os tipos de todas as variáveis usadas neste aplicativo
type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

//pega as variáveis necessárias para entrar e dar um nome pra sala
//muda o estado das questões para serem inseridas na página 
export function UseRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  //useEffect -> 
  useEffect( () => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions??{};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { questions, title }
}