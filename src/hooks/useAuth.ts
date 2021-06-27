import { useContext } from 'react'
import { AuthContext } from '../contextos/authContext'

export function useAuth() {
  const value = useContext(AuthContext)
  return value;
}