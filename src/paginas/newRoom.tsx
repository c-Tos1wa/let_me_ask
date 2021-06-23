import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../componentes/button'
import { useAuth } from '../hooks/useAuth';

import '../estilos/auth.scss'


export function NewRoom(){
  const {user} = useAuth()

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
          <form>
            <input type='text' placeholder='Digite o nome da sala'></input>
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