import copyImg from '../assets/images/copy.svg'
import '../estilos/room-code.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
function copiarCodigo(){
  navigator.clipboard.writeText(props.code)
}

return(
  <button className='room-code' onClick={copiarCodigo}>
    <div>
      <img src={copyImg} alt='Copy room code' />
    </div>
    <span>Sala #{props.code}</span>
  </button>
  )
}