import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Briefcase, Hash, LogOut } from 'lucide-react';

const TeacherProfile = () => {
  const navigate = useNavigate();

  const teacherData = {
    name: "Dr. Sarah Johnson",
    initials: "DSJ",
    email: "sarah.johnson@school.edu",
    role: "Teacher",
    department: "Computer Science",
    userId: "T001",
    memberSince: "2020"
  };

  const boxStyle = { background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
  const labelStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0ea5e9', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid #f0f9ff', paddingBottom: '0.5rem' };

  return (
    <div className="dashboard-container" style={{ maxWidth: '900px' }}>
      <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back</button>
      
      <div style={{ background: 'linear-gradient(to bottom, #f0f9ff, #ffffff)', borderRadius: '16px', padding: '3rem', textAlign: 'center', border: '1px solid #e0f2fe', marginBottom: '2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', color: 'white', fontSize: '2.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          {teacherData.initials}
        </div>
        <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '0.4rem' }}>{teacherData.name}</h2>
        <span style={{ background: '#0ea5e9', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>{teacherData.role}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={boxStyle}>
          <div style={labelStyle}><Mail size={16}/> Email Address</div>
          <div style={{ color: '#334155', fontWeight: '500' }}>{teacherData.email}</div>
        </div>
        <div style={boxStyle}>
          <div style={labelStyle}><Briefcase size={16}/> Department</div>
          <div style={{ color: '#334155', fontWeight: '500' }}>{teacherData.department}</div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f1f5f9', marginBottom: '2rem' }}>
        <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', color: '#0284c7', fontWeight: '600', borderBottom: '1px solid #f1f5f9' }}>
          Account Information
        </div>
        <div style={{ padding: '0 1.5rem' }}>
          {[
            { label: 'Account Type', value: 'Instructor Account' },
            { label: 'Status', value: 'Active', isBadge: true },
            { label: 'Instructor ID', value: teacherData.userId },
            { label: 'Member Since', value: teacherData.memberSince }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', borderBottom: idx === 3 ? 'none' : '1px solid #f1f5f9' }}>
              <span style={{ color: '#475569', fontWeight: '500' }}>{item.label}</span>
              {item.isBadge ? (
                <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>{item.value}</span>
              ) : (
                <span style={{ color: '#0f172a', fontWeight: '600' }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Logout Button in Settings/Profile */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            background: '#fef2f2', color: '#ef4444', 
            border: '1px solid #fecaca', padding: '0.75rem 1.5rem', 
            borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
          onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
        >
          <LogOut size={18} />
          Logout of Account
        </button>
      </div>

    </div>
  );
};

export default TeacherProfile;