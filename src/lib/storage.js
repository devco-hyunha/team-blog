// localStorage 데이터 계약. 팀원 컴포넌트가 이 헬퍼만 사용한다.
import users from '../data/users.json'

export const KEYS = {
  users: 'ax-blog:users',
  session: 'ax-blog:session',
  posts: 'ax-blog:posts',
  visitors: 'ax-blog:visitors',
}

/**
 * 컬렉션 데이터를 읽는 함수
 * @param {string} key - localStorage의 키
 * @returns {Array} - 읽어온 데이터 배열
 */
export const readCollection = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * 컬렉션 데이터를 쓰는 함수
 * @param {string} key - localStorage의 키
 * @param {Array} value - 저장할 데이터 배열
 */
export const writeCollection = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 세션 데이터를 읽는 함수
 * @description
 * - 세션은 localStorage(영구) 또는 sessionStorage(탭 종료 시 만료) 중 저장
 * - sessionStorage 우선 조회 후, localStorage를 조회
 * @returns {string|null} - 읽어온 세션 데이터 (userId) 또는 null
 */
export const readSession = () => {
  return (
    sessionStorage.getItem(KEYS.session) ??
    localStorage.getItem(KEYS.session) ??
    null
  )
}

/**
 * 세션 데이터를 쓰는 함수
 * @description
 * - 세션은 localStorage(영구) 또는 sessionStorage(탭 종료 시 만료) 중 저장
 * - 기존 세션이 두 저장소에 흩어져 있을 수 있으므로 둘 다 비움
 * - 이후 persist 값에 따라 localStorage 또는 sessionStorage에 저장
 * @param {string} userId - 사용자 ID
 * @param {boolean} persist - 영구 저장 여부
 */
export const writeSession = (userId, persist = false) => {
  localStorage.removeItem(KEYS.session)
  sessionStorage.removeItem(KEYS.session)
  if (userId) {
    const store = persist ? localStorage : sessionStorage
    store.setItem(KEYS.session, userId)
  }
}

/**
 * 세션 데이터를 제거하는 함수
 * @description localStorage와 sessionStorage 모두에서 세션 데이터를 제거
 */
export const clearSession = () => {
  localStorage.removeItem(KEYS.session)
  sessionStorage.removeItem(KEYS.session)
}

/**
 * UUID를 생성하는 함수
 * @description
 * - crypto.randomUUID()를 사용하여 고유한 식별자를 생성
 * - randomUUID는 보안 컨텍스트(HTTPS 또는 localhost)에서만 제공되므로,
 *   내부 IP(http://192.168.x.x 등)로 접속할 때는 getRandomValues 기반 폴백 사용
 * - 이 식별자는 사용자 ID, 게시물 ID 등 다양한 용도로 사용 가능
 * @returns {string} - 생성된 UUID (v4 형식)
 */
export const createId = () => {
  // 보안 컨텍스트에서는 표준 API 사용
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  // 폴백: 16바이트 랜덤 값으로 UUID v4 생성
  const bytes = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < 16; i += 1) bytes[i] = Math.floor(Math.random() * 256)
  }

  // v4 비트 규칙 적용
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join('-')
}

/**
 * 초기 데이터 시드를 보장하는 함수
 * @description
 * - 애플리케이션이 처음 실행될 때 users.json의 데이터를 localStorage에 심음
 */
export const ensureSeed = () => {
  if (localStorage.getItem(KEYS.users) === null) {
    writeCollection(KEYS.users, users)
  }
}

/**
 * 사용자 ID로 사용자를 찾는 함수
 * @param {string} userId - 사용자 ID
 * @returns {Object|null} - 사용자 객체 또는 null
 */
export const findUser = (userId) => {
  return readCollection(KEYS.users).find((u) => u.id === userId) ?? null
}

/**
 * ISO 날짜 문자열을 한국어 형식으로 변환하는 함수
 * @param {string} iso - ISO 형식의 날짜 문자열
 * @returns {string} - 한국어 형식의 날짜 문자열 또는 빈 문자열
 */
export const formatDate = (iso) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('ko-KR')
}
