import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Fragment } from 'react';

const navItems = [
  { to: '/', label: '홈' },
  { to: '/visitor', label: '방명록' },
];

const NaviBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <NavLink to="/" style={styles.logo}>
            Ax<span style={styles.logoAccent}>Blog</span>
          </NavLink>

          <div style={styles.menuList}>
            {navItems.map((item) => (
              <Fragment key={item.to}>
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive ? styles.activeNavLink : {}),
                  })}
                >
                  {item.label}
                </NavLink>
              </Fragment>
            ))}
          </div>
        </div>

        <div style={styles.rightSection}>
          {isAuthenticated ? (
            <div style={styles.userProfileGroup}>
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <span style={styles.userName}>{user?.name} 님</span>
              </div>
              <button type="button" onClick={logout} style={styles.logoutBtn}>
                로그아웃
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              state={{ from: location }}
              style={styles.loginBtn}
            >
              로그인
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    width: '100%',
    height: '64px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f3f5',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  container: {
    maxWidth: '1200px',
    height: '100%',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  logo: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#212529',
    textDecoration: 'none',
    letterSpacing: '-0.5px',
    fontFamily: 'Fira Mono, monospace, sans-serif',
  },
  logoAccent: {
    color: '#12b886',
  },
  menuList: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  navLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#495057',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
  },
  activeNavLink: {
    color: '#12b886',
    fontWeight: '700',
    backgroundColor: '#f8f9fa',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  userProfileGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#e6fcf5',
    color: '#12b886',
    fontWeight: '700',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #12b886',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#212529',
  },
  logoutBtn: {
    padding: '6px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#495057',
    backgroundColor: '#f1f3f5',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  loginBtn: {
    padding: '7px 20px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#ffffff',
    backgroundColor: '#212529',
    borderRadius: '20px',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
  },
};

export default NaviBar;