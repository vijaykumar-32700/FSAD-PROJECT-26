import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Bell, LogOut, User } from 'lucide-react';

const Navigation = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = role === 'teacher' 
    ? [
        { name: 'Dashboard', path: '/teacher' },
        { name: 'Assignments', path: '/teacher/assignments' },
        { name: 'Students', path: '/teacher/students' },
        { name: 'Calendar', path: '/teacher/calendar' },
        { name: 'Resources', path: '/teacher/resources' }
      ]
    : [
        { name: 'Dashboard', path: '/student' },
        { name: 'My Assignments', path: '/student/assignments' },
        { name: 'Peer Reviews', path: '/student/reviews' },
        { name: 'Calendar', path: '/student/calendar' },
        { name: 'Resources', path: '/student/resources' }
      ];

  const profileInitials = role === 'teacher' ? 'DSJ' : 'AM';

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* The Link 'to' property perfectly redirects to the dashboard based on role */}
        <Link to={role === 'teacher' ? '/teacher' : '/student'} className="brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-icon"><BookOpen size={20} strokeWidth={2.5} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ color: '#a21caf', fontWeight: '700' }}>PeerLearn</span>
            <span className="role-badge" style={{ color: '#64748b', fontSize: '0.75rem' }}>{role}</span>
          </div>
        </Link>
        
        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.name} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="nav-right" style={{ position: 'relative' }} ref={dropdownRef}>
        <div className="bell-icon-wrapper" onClick={() => navigate(`/${role}/notifications`)} style={{ cursor: 'pointer' }}>
          <Bell size={22} color="#64748b" />
          <div className="notification-dot">3</div>
        </div>
        
        <div 
          className="profile-icon" 
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: 'pointer', display: 'flex', gap: '4px', paddingRight: '4px' }}
        >
          {profileInitials}
        </div>

        {showDropdown && (
          <div style={{ 
            position: 'absolute', top: '110%', right: '0', background: 'white', 
            borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
            border: '1px solid #f1f5f9', width: '180px', zIndex: '1000', overflow: 'hidden'
          }}>
            <div 
              style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', transition: 'background 0.2s' }}
              onClick={() => { navigate(`/${role}/profile`); setShowDropdown(false); }}
              onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              <User size={16} color="#64748b" />
              <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>My Profile</span>
            </div>
            <div 
              style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9' }}
              onClick={() => navigate('/')}
              onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              <LogOut size={16} color="#ef4444" />
              <span style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: '600' }}>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;