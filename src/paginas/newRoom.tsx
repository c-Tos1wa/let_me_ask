import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../componentes/button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth';

import '../estilos/auth.scss'


export function NewRoom(){
  const {user} = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCriarSala(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebase = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    history.push(`/rooms/${firebase.key}`)
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="simbolo de perguntar e reposta" />
        <strong>Crie salas de Q&amp;A</strong>
        <p>Tire as dúvidas da sua sala em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
            <h2>{user?.name}</h2>
            <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCriarSala}>
            <input type='text' placeholder='Digite o nome da sala'
             onChange={event => setNewRoom(event.target.value)} 
             value={newRoom} />
            <Button type="submit"> Criar sala </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}