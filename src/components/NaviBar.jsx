import { NavLink, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Fragment } from 'react'

const navItems = [
  { to: '/', label: '홈' },
  { to: '/visitor', label: '방명록' },
]

const NaviBar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  return (
    <nav>
      <NavLink to="/">
        AxBlog
      </NavLink>

      {navItems.map((item) => (
        <Fragment key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? 'text-slate-900'
                : 'hover:text-slate-900'
            }
          >
            {item.label}
          </NavLink>
        </Fragment>
      ))}

      {isAuthenticated ? (
        <>
          <span>{user.name} 님</span>
          <button type="button" className="cursor-pointer" onClick={logout}>
            로그아웃
          </button>
        </>
      ) : (
        <NavLink
          to="/login"
          state={{ from: location }}
        >
          로그인
        </NavLink>
      )}
    </nav>
  )
}

export default NaviBar