import {useParams} from 'react-router-dom'
import {useState, FormEvent} from 'react'
import logoImg from '../assets/images/logo.svg'
import {Button} from '../componentes/button'
import {RoomCode} from '../componentes/roomCode'
import {useAuth} from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../componentes/question'
import { UseRoom } from '../hooks/useRoom'


type RoomParams = {
  id: string;
}

export function AdminRoom (){
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id
  const [newQ, setNewQ] = useState('')
  const { title, questions } = UseRoom (roomId)
  
  

  async function fazerPergunta(event: FormEvent) {
    event.preventDefault();

    if (newQ.trim() === ''){
      return;
    }
    if (!user) {
      throw new Error('You must be logged to do this action')
    }

    const question = {
      content: newQ,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    }
    await database.ref(`rooms/${roomId}/questions`).push(question)
    
    setNewQ('');
  }

  return (
    <div id='page-room'>
        <header>
          <div className='content'>
            <img src={logoImg} alt='Letmeask' />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined>Encerrar a sala</Button>
            </div>
          </div>
        </header>

        <main>
          <div className='room-title'>
            <h1>Sala {title}</h1>
            { questions.length > 0 && <span>{questions.length}</span>}
          </div>

          <div className="question-list">
            {questions.map(question => {
              return(
                <Question 
                key={question.id}
                  content={question.content}
                  author={question.author}/>
              );
            })}
          </div>
        </main>
    </div>
    
  )
}