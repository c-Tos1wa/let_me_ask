import {useHistory} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../componentes/button'
import {useAuth} from '../hooks/useAuth'

import '../estilos/auth.scss'


export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()

  async function criarSala(){
    if(!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new');
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
          <form>
            <input type='text' placeholder='Digite o código da sala'></input>
            <Button type="submit"> Entrar na sala </Button>
          </form>
        </div>
      </main>
    </div>
  )
}