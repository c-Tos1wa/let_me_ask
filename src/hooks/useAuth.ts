import { useContext } from 'react'
import { AuthContext} from '../contextos/authContext'

export function useAuth() {
  const valor = useContext(AuthContext)
  return valor;
}