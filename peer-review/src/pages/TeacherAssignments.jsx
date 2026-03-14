import React, { useState } from 'react';
import { Plus, Trash2, X, FileText, CheckCircle2, Users } from 'lucide-react';

const TeacherAssignments = () => {
  const [toast, setToast] = useState(null);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Research Paper: Climate Change Impact (Section A)",
      due: "4/3/2026, 5:30:07 pm",
      points: 100,
      reviewsReq: 2,
      desc: "Write a comprehensive research paper analyzing the impact of climate change on coastal ecosystems. Include at least 3 peer-reviewed sources.",
      subs: 45,
      graded: 12,
      isGroup: false
    },
    {
      id: 2,
      title: "Capstone: Full-Stack Web App (Section A)",
      due: "15/5/2026, 11:59:00 pm",
      points: 300,
      reviewsReq: 3,
      desc: "Build a complete web application in teams of up to 3 students. You must collaborate on the frontend, backend, and database schema.",
      subs: 8,
      graded: 0,
      isGroup: true,
      groupLimit: 3 // NEW: Initial mock data has a group limit
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // NEW: Added groupLimit to the new assignment state
  const [newAssignment, setNewAssignment] = useState({ 
    title: '', desc: '', due: '', points: 100, reviewsReq: 2, isGroup: false, groupLimit: 3 
  });

  const showToast = (title, subtitle) => {
    setToast({ title, subtitle });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAssignment({ title: '', desc: '', due: '', points: 100, reviewsReq: 2, isGroup: false, groupLimit: 3 });
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const assignmentToAdd = {
      ...newAssignment,
      id: Date.now(),
      subs: 0,
      graded: 0,
      due: new Date(newAssignment.due).toLocaleString('en-GB')
    };
    setAssignments([assignmentToAdd, ...assignments]);
    handleCloseModal();
    showToast("Assignment Created Successfully!", "Students can now view and submit this assignment.");
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-container">

      {/* GLOBAL TOAST POPUP */}
      {toast && (
        <div className="toast-notification">
          <CheckCircle2 size={28} color="white" />
          <div className="toast-content">
            <span className="toast-title">{toast.title}</span>
            <span className="toast-subtitle">{toast.subtitle}</span>
          </div>
        </div>
      )}

      <div className="page-header-row">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>Assignments</h1>
          <p style={{ color: '#64748b' }}>Create and manage assignments</p>
        </div>
        <button className="btn-cyan" onClick={handleOpenModal} style={{ padding: '0.75rem 1.5rem', background: '#0ea5e9', color: 'white' }}>
          <Plus size={18} /> Create Assignment
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
        {assignments.map((item) => (
          <div key={item.id} className="assignment-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
            <div style={{ backgroundColor: '#f0f9ff', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e0f2fe', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ color: '#0369a1', fontSize: '1.15rem', fontWeight: '600', margin: 0 }}>{item.title}</h3>
                  {/* DYNAMIC GROUP BADGE WITH LIMIT */}
                  {item.isGroup && (
                    <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} /> Group Project (Max {item.groupLimit})
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                  <span>Due: {item.due}</span>
                  <span>• {item.points} points</span>
                  <span>• {item.reviewsReq} reviews required</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleDelete(item.id)} 
                className="delete-btn-custom"
                title="Delete Assignment"
                style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Trash2 size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.desc}</p>
              <div className="badge-group" style={{ display: 'flex', gap: '0.75rem' }}>
                <span className="badge cyan" style={{ padding: '0.5rem 0.75rem', borderRadius: '6px' }}>{item.subs} submissions</span>
                <span className="badge green" style={{ padding: '0.5rem 0.75rem', borderRadius: '6px' }}>{item.graded} graded</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close" onClick={handleCloseModal}><X size={24} /></button>
            <h2 className="modal-title">Create New Assignment</h2>
            <p className="modal-subtitle">Set up a new assignment for your students</p>

            <form onSubmit={handleCreateAssignment}>
              <div className="input-group-modal">
                <label>Assignment Title *</label>
                <input type="text" className="textarea-field" style={{ minHeight: '45px', padding: '0 0.75rem' }} value={newAssignment.title} onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})} required />
              </div>

              <div className="input-group-modal">
                <label>Description *</label>
                <textarea className="textarea-field" value={newAssignment.desc} onChange={(e) => setNewAssignment({...newAssignment, desc: e.target.value})} required />
              </div>

              {/* ENHANCED GROUP PROJECT TOGGLE WITH DYNAMIC LIMIT FIELD */}
              <div className="input-group-modal" style={{ flexDirection: 'column', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input 
                    type="checkbox" 
                    id="group-toggle"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    checked={newAssignment.isGroup} 
                    onChange={(e) => setNewAssignment({...newAssignment, isGroup: e.target.checked})} 
                  />
                  <label htmlFor="group-toggle" style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: '500' }}>
                    <Users size={18} color="#4f46e5" /> Enable Group Project (Team Workspace)
                  </label>
                </div>
                
                {/* Dynamically shows only when Group is enabled */}
                {newAssignment.isGroup && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', paddingLeft: '2rem' }}>
                    <label style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500', margin: 0 }}>Max Members per Team:</label>
                    <input 
                      type="number" 
                      min="2"
                      max="15"
                      className="textarea-field" 
                      style={{ minHeight: '35px', padding: '0 0.5rem', width: '80px', margin: 0 }}
                      value={newAssignment.groupLimit}
                      onChange={(e) => setNewAssignment({...newAssignment, groupLimit: parseInt(e.target.value) || 2})}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className="input-group-modal">
                  <label>Due Date *</label>
                  <input type="datetime-local" className="textarea-field" style={{ minHeight: '45px', padding: '0 0.75rem' }} value={newAssignment.due} onChange={(e) => setNewAssignment({...newAssignment, due: e.target.value})} required />
                </div>
                <div className="input-group-modal">
                  <label>Total Points</label>
                  <input type="number" className="textarea-field" style={{ minHeight: '45px', padding: '0 0.75rem' }} value={newAssignment.points} onChange={(e) => setNewAssignment({...newAssignment, points: e.target.value})} />
                </div>
              </div>

              <div className="input-group-modal" style={{ marginBottom: '1.5rem' }}>
                <label>Peer Reviews Required</label>
                <input type="number" className="textarea-field" style={{ minHeight: '45px', padding: '0 0.75rem' }} value={newAssignment.reviewsReq} onChange={(e) => setNewAssignment({...newAssignment, reviewsReq: e.target.value})} />
              </div>

              <div className="modal-actions" style={{ borderTop: 'none', paddingTop: '1rem' }}>
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn-cyan" style={{ background: '#0ea5e9', color: 'white' }}>Create Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;