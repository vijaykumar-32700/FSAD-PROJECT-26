import React, { useState } from 'react';
import { Bell, Award, Star, Clock, FileText, CheckCircle2, Trash2 } from 'lucide-react';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "grade",
      title: "New Grade Posted",
      message: "Dr. Sarah Johnson has graded your 'Research Paper: Climate Change Impact'.",
      time: "2 hours ago",
      read: false,
      color: "#a855f7",
      bg: "#f3e8ff",
      icon: <Award size={20} />
    },
    {
      id: 2,
      type: "review",
      title: "Peer Review Received",
      message: "An anonymous peer has reviewed your Data Analysis Project.",
      time: "5 hours ago",
      read: false,
      color: "#0ea5e9",
      bg: "#e0f2fe",
      icon: <Star size={20} />
    },
    {
      id: 3,
      type: "alert",
      title: "Upcoming Deadline",
      message: "Your 'Mobile App Design Document' is due tomorrow at 11:59 PM.",
      time: "1 day ago",
      read: true,
      color: "#f97316",
      bg: "#ffedd5",
      icon: <Clock size={20} />
    },
    {
      id: 4,
      type: "system",
      title: "New Assignment Available",
      message: "A new assignment has been posted in Section A.",
      time: "2 days ago",
      read: true,
      color: "#10b981",
      bg: "#dcfce7",
      icon: <FileText size={20} />
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-container" style={{ maxWidth: '800px' }}>
      
      <div className="page-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>Notifications</h1>
          <p style={{ color: '#64748b' }}>Stay updated on your grades, deadlines, and peer feedback</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0f9ff', color: '#0ea5e9', border: '1px solid #bae6fd', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e0f2fe'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f0f9ff'}
          >
            <CheckCircle2 size={18} /> Mark all as read
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Bell size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.5rem' }}>All Caught Up!</h3>
            <p style={{ color: '#64748b' }}>You have no new notifications.</p>
          </div>
        ) : (
          notifications.map(note => (
            <div key={note.id} style={{ 
              display: 'flex', gap: '1.25rem', background: note.read ? 'white' : '#f8fafc', 
              padding: '1.5rem', borderRadius: '12px', border: `1px solid ${note.read ? '#e2e8f0' : '#cbd5e1'}`, 
              position: 'relative', transition: 'all 0.2s',
              boxShadow: note.read ? 'none' : '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              
              {!note.read && (
                <div style={{ position: 'absolute', top: '1.5rem', left: '-6px', width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', border: '2px solid white' }}></div>
              )}

              <div style={{ background: note.bg, color: note.color, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {note.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <h4 style={{ color: '#0f172a', fontSize: '1.05rem', margin: 0, fontWeight: note.read ? '600' : '700' }}>{note.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{note.time}</span>
                </div>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 1rem 0', lineHeight: '1.5' }}>{note.message}</p>
              </div>

              <button 
                onClick={() => deleteNotification(note.id)}
                style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '0.25rem', height: 'fit-content' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotifications;