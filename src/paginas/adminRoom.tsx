import {useParams, useHistory} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import {Button} from '../componentes/button'
import {RoomCode} from '../componentes/roomCode'
import { Question } from '../componentes/question'

import { UseRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'

import '../estilos/room.scss'


type RoomParams = {
  id: string;
}

export function AdminRoom (){
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id
  
  const { title, questions } = UseRoom (roomId)
  
  async function encerrarSala(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string){
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }


  return (
    <div id='page-room'>
        <header>
          <div className='content'>
            <img src={logoImg} alt='Letmeask' />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={encerrarSala}>Encerrar a sala</Button>
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
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type='button'
                        onClick = {() => handleCheckQuestionAnswered(question.id)}
                      >
                        <img src={checkImg} alt='marcar como respondida' />
                      </button>

                      <button
                        type='button'
                        onClick = {() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt='destaque a pergunta' />
                      </button>
                    </>
                  )}
                  <button
                    type='button'
                    onClick = {() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt='remove pergunta' />
                  </button>
              </Question> 
              );
            })}
          </div>
        </main>
    </div>   
  )
}