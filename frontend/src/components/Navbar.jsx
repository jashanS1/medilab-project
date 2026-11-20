import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Tests & Services'],
  ['/departments', 'Departments'],
  ['/doctors', 'Our Team'],
  ['/reports', 'Reports'],
  ['/contact', 'Contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      try {
        const stored = sessionStorage.getItem('userInfo');
        setUser(stored ? JSON.parse(stored) : null);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const close = () => setOpen(false);

  const logout = () => {
    sessionStorage.removeItem('userInfo');
    setUser(null);
    toast.success('You have been logged out safely.');
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-content">
          <span><i className="bi bi-clock" /> Sample collection: 6:30 AM - 7:30 PM</span>
          <span><i className="bi bi-telephone" /> +91 1800 120 2026</span>
          <span className="utility-help"><i className="bi bi-shield-check" /> NABL Quality Certified Lab</span>
        </div>
      </div>
      <div className="nav-wrap shell">
        <Link to="/" className="brand" onClick={close} aria-label="MediLab Diagnostics home">
          <span className="brand-mark"><i className="bi bi-activity" /></span>
          <span>Medi<span>Lab</span><small>DIAGNOSTICS</small></span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Open navigation"
        >
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} />
        </button>
        <nav className={open ? 'primary-nav open' : 'primary-nav'}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={close} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          {user && user.isAdmin === 0 && (
            <NavLink
              to="/doctor-portal"
              onClick={close}
              style={{
                background: '#0d3b66',
                color: '#ffffff',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              🩺 Doctor Portal
            </NavLink>
          )}
          {user ? (
            <div className="nav-user-badge">
              <span className="user-greeting" title={user.email}>
                <i className="bi bi-person-circle" /> {user.isAdmin === 0 ? `Dr. ${user.name?.split(' ')[0] || 'Gurjit'}` : (user.name?.split(' ')[0] || 'Patient')}
              </span>
              <button className="nav-account" onClick={logout}>Sign out</button>
            </div>
          ) : (
            <NavLink to="/login" onClick={close}>Sign in</NavLink>
          )}
        </nav>
        <Link to="/appointment" className="book-button" onClick={close}>
          Book a Test <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </header>
  );
}
