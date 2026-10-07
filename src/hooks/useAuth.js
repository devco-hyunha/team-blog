import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

/**
 * useAuth 훅은 AuthContext를 사용하여 인증 상태를 제공
 * @returns {{ user: Object|null, isAuthenticated: boolean, login: Function, logout: Function }}
 */
const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (ctx === null) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.')
  }
  return ctx
}

export default useAuth