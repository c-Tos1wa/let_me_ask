import {useHistory} from 'react-router-dom'
import {FormEvent, useState} from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../componentes/button'
import {useAuth} from '../hooks/useAuth'

import '../estilos/auth.scss'
import { database } from '../services/firebase'

//mostra a pagina inicial do aplicativo
//useHistory -> contém todo o histórico que o usuário fez.
export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  //espera o usuario fazer sign in com o Google e então,
  // cria uma nova sala
  async function criarSala(){
    if(!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  //Entrar na sala pelo código de sala -> se existir, entra na sala pelo código.
  //Se não existir, produz um alerta de sala inexistente
  //se não for passado nenhum código, retorna pra esperar o sign in
  async function entrarNaSala (event: FormEvent) {
      event.preventDefault();

      if(roomCode.trim()===''){
        return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();
      if(!roomRef.exists()) {
        alert("This room doesn't exist")
        return
      }
    history.push(`/rooms/${roomCode}`)
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
          <button className="create-room" onClick={criarSala}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou Entre em uma sala</div>
          <form onSubmit={entrarNaSala}>
            <input type='text' placeholder='Digite o código da sala'
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}/>
            <Button type="submit"> Entrar na sala </Button>
          </form>
        </div>
      </main>
    </div>
  )
}