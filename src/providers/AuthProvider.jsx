import { useCallback, useEffect, useMemo, useState } from 'react'
import AuthContext from '../context/AuthContext'
import {
  KEYS,
  ensureSeed,
  findUser,
  readCollection,
  readSession,
  writeSession,
  clearSession,
} from '../lib/storage'

/**
 * AuthProvider 컴포넌트는 애플리케이션의 인증 상태를 관리
 * @param {React.ReactNode} children - AuthProvider로 감싸진 자식 컴포넌트 
 * @returns {JSX.Element} - AuthContext.Provider로 감싸진 자식 컴포넌트
 */
const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => readSession())

  useEffect(() => {
    ensureSeed()
  }, [])

  /**
   * 로그인 함수
   * @param {string} email - 사용자의 이메일
   * @param {string} password - 사용자의 비밀번호
   * @param {boolean} persist - 세션 지속 여부 (true: localStorage, false: sessionStorage)
   * @returns {boolean} - 로그인 성공 여부
   */
  const login = useCallback((email, password, persist = false) => {
    const user = readCollection(KEYS.users).find(
      (u) => u.email === email && u.password === password,
    )
    if (!user) return false
    writeSession(user.id, persist)
    setUserId(user.id)
    return true
  }, [])

  /**
   * 로그아웃 함수
   * 세션을 제거하고 userId 상태를 null로 설정
   * @returns {void}
   */
  const logout = useCallback(() => {
    clearSession()
    setUserId(null)
  }, [])

  /**
   * AuthContext에 제공할 값
   * @type {{ user: Object|null, isAuthenticated: boolean, login: Function, logout: Function }}
   */
  const value = useMemo(
    () => ({ user: findUser(userId), isAuthenticated: userId !== null, login, logout }),
    [userId, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthProvider