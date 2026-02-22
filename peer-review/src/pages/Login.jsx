import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Check, Eye, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Student');
  // New state to toggle between Login and Sign Up views
  const [isLoginView, setIsLoginView] = useState(true); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'Student') navigate('/student');
    else navigate('/teacher');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Left Side - Gradient Panel */}
        <div className="login-left">
          <div className="icon-box">
            <BookOpen size={28} color="white" />
          </div>
          <h1>PeerLearn Platform</h1>
          <p>Collaborative learning through peer review and feedback</p>
          
          <ul className="features">
            <li>
              <div className="check-icon"><Check size={16} /></div>
              Submit assignments with file uploads
            </li>
            <li>
              <div className="check-icon"><Check size={16} /></div>
              Review peers and get feedback
            </li>
            <li>
              <div className="check-icon"><Check size={16} /></div>
              Track progress and deadlines
            </li>
          </ul>
        </div>

        {/* Right Side - Form Panel */}
        <div className="login-right">
          
          <div className="auth-tabs">
            <button 
              type="button"
              className={`auth-tab ${isLoginView ? 'active' : ''}`} 
              onClick={() => setIsLoginView(true)}
            >
              <LogIn size={16} /> Login
            </button>
            <button 
              type="button"
              className={`auth-tab ${!isLoginView ? 'active' : ''}`} 
              onClick={() => setIsLoginView(false)}
            >
              <UserPlus size={16} /> Sign Up
            </button>
          </div>

          <div className="welcome-text">
            <h2>{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLoginView ? 'Sign in to your account' : 'Join PeerLearn today'}</p>
          </div>

          <div className="role-toggle">
            <button 
              type="button" 
              className={role === 'Student' ? 'active' : ''} 
              onClick={() => setRole('Student')}
            >
              Student
            </button>
            <button 
              type="button" 
              className={role === 'Teacher' ? 'active' : ''} 
              onClick={() => setRole('Teacher')}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Show Full Name only on Sign Up */}
            {!isLoginView && (
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-field">
                  <input type="text" placeholder="John Doe" required />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <div className="input-field">
                <input type="email" placeholder="your@email.com" required />
              </div>
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <input type="password" placeholder="••••••••" required />
                <Eye size={18} className="eye-btn" />
              </div>
            </div>

            {/* Show Confirm Password only on Sign Up */}
            {!isLoginView && (
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-field">
                  <input type="password" placeholder="••••••••" required />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className={`submit-btn ${!isLoginView ? 'signup-gradient' : ''}`}
            >
              {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
            
            {isLoginView && <p className="demo-text">Demo: Use any email/password</p>}
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;