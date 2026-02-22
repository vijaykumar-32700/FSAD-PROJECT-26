import React, { useState } from 'react';
import { Clock, CheckCircle2, Award, AlertCircle, FileText, Upload, Send, X, MessageSquare, Star, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Pending Assignments Data
  const [pendingAssignments, setPendingAssignments] = useState([
    { id: 1, title: "Data Analysis Project (Section A)", author: "Dr. Sarah Johnson", desc: "Analyze the provided dataset and create visualizations showing key trends. Write a summary report explaining your findings and methodology.", due: "24/3/2026", daysLeft: "30 days left" },
    { id: 2, title: "Programming Assignment: Web API (Section A)", author: "Dr. Sarah Johnson", desc: "Develop a RESTful API using Node.js and Express. Include authentication, CRUD operations, and proper error handling.", due: "13/4/2026", daysLeft: "50 days left" }
  ]);

  // Updated Submissions Data using actual numbers so we can calculate the average!
  // Use null if it hasn't been graded yet.
  const [recentSubmissions, setRecentSubmissions] = useState([
    { 
      id: 101, 
      title: "Literature Review Essay (Section A)", 
      date: "15/2/2026", 
      status: "Fully Graded", 
      teacherScore: 92, // out of 100
      peerScore: 4.8    // out of 5
    },
    { 
      id: 102, 
      title: "Mobile App Design Document (Section A)", 
      date: "20/2/2026", 
      status: "Peer Reviewed", 
      teacherScore: null, 
      peerScore: 4.2 
    },
    { 
      id: 103, 
      title: "Research Paper: Climate Change Impact", 
      date: "22/2/2026", 
      status: "Pending Review", 
      teacherScore: null, 
      peerScore: null 
    }
  ]);

  // Modal Handlers
  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setSubmissionText('');
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove from Pending
    setPendingAssignments(pendingAssignments.filter(a => a.id !== selectedAssignment.id));
    
    // Add to Submissions dynamically with null scores (since it's not graded yet)
    const newSubmission = {
      id: Date.now(),
      title: selectedAssignment.title,
      date: new Date().toLocaleDateString('en-GB'),
      status: "Pending Review",
      teacherScore: null,
      peerScore: null
    };
    setRecentSubmissions([newSubmission, ...recentSubmissions]);
    
    closeModal();
  };

  // ==========================================
  // NEW: Calculate Averages & Stats automatically!
  // ==========================================
  const gradedByTeacher = recentSubmissions.filter(sub => sub.teacherScore !== null);
  const gradedByPeer = recentSubmissions.filter(sub => sub.peerScore !== null);

  const totalTeacherGrades = gradedByTeacher.length;
  const totalPeerReviews = gradedByPeer.length;

  // Calculate Average Teacher Score (out of 100)
  const avgTeacherScore = totalTeacherGrades > 0 
    ? (gradedByTeacher.reduce((sum, curr) => sum + curr.teacherScore, 0) / totalTeacherGrades).toFixed(1)
    : 0;

  // Calculate Average Peer Score (out of 5)
  const avgPeerScore = totalPeerReviews > 0 
    ? (gradedByPeer.reduce((sum, curr) => sum + curr.peerScore, 0) / totalPeerReviews).toFixed(1)
    : 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-orange">
          <div className="stat-card-header"><Clock size={18}/> Pending Work</div>
          <div className="stat-value">{pendingAssignments.length}</div>
          <div className="stat-label">assignments to complete</div>
        </div>
        <div className="stat-card card-teal">
          <div className="stat-card-header"><CheckCircle2 size={18}/> Submitted</div>
          <div className="stat-value">{recentSubmissions.length}</div>
          <div className="stat-label">assignments completed</div>
        </div>
        <div className="stat-card card-purple">
          <div className="stat-card-header"><Award size={18}/> Teacher Grades</div>
          <div className="stat-value">{totalTeacherGrades}</div>
          <div className="stat-label">official grades received</div>
        </div>
        <div className="stat-card card-blue">
          <div className="stat-card-header"><MessageSquare size={18}/> Peer Reviews</div>
          <div className="stat-value">{totalPeerReviews}</div>
          <div className="stat-label">classmate reviews received</div>
        </div>
      </div>

      {/* NEW: SPECIAL PERFORMANCE INSIGHTS BANNER */}
      <div style={{ 
        background: 'linear-gradient(to right, #0f172a, #1e293b)', 
        color: 'white', 
        padding: '1.5rem 2rem', 
        borderRadius: '12px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem', 
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={22} color="#38bdf8" /> Performance Insights
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Your cumulative average scores across all graded projects</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Teacher Average Box */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
              Teacher Average
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', lineHeight: '1' }}>
              {avgTeacherScore}<span style={{ fontSize: '1rem', color: '#64748b' }}>/100</span>
            </div>
          </div>
          
          {/* Peer Average Box */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
              Peer Average
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', lineHeight: '1' }}>
              {avgPeerScore}<span style={{ fontSize: '1rem', color: '#64748b' }}>/5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panels-grid">
        {/* PENDING ASSIGNMENTS PANEL */}
        <div className="panel-card" style={{ padding: 0 }}>
          <div className="panel-title tint-orange" style={{ margin: 0, borderBottom: '1px solid #f1f5f9' }}>
            <Clock size={20} /> Pending Assignments
          </div>
          <div className="scrollable-panel">
            {pendingAssignments.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>All caught up! No pending assignments.</p>
            ) : (
              pendingAssignments.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div className="task-title">{task.title}</div>
                    <div className="task-badge-orange">{task.daysLeft}</div>
                  </div>
                  <div className="task-author">by {task.author}</div>
                  <div className="task-desc">{task.desc}</div>
                  <div className="task-footer">
                    <span>Due: {task.due}</span>
                    <button className="btn-start" onClick={() => openModal(task)}>Start Assignment</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* RECENT SUBMISSIONS & REVIEW STATS PANEL */}
        <div className="panel-card" style={{ padding: 0 }}>
          <div className="panel-title tint-green" style={{ margin: 0, borderBottom: '1px solid #f1f5f9' }}>
            <FileText size={20} /> Submissions & Feedback
          </div>
          <div className="scrollable-panel">
            {recentSubmissions.map(sub => (
              <div key={sub.id} className="task-card sub-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="task-header" style={{ marginBottom: 0 }}>
                  <div className="task-title">{sub.title}</div>
                  <div className="task-badge-gray" style={{ 
                    background: sub.status === 'Fully Graded' ? '#dcfce7' : '#f1f5f9', 
                    color: sub.status === 'Fully Graded' ? '#166534' : '#64748b' 
                  }}>
                    {sub.status}
                  </div>
                </div>
                <div className="task-author" style={{ marginBottom: '0.5rem' }}>Submitted {sub.date}</div>
                
                {/* Dynamically displaying the numeric scores from state */}
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
                  
                  {/* Teacher Score */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: sub.teacherScore !== null ? '#7e22ce' : '#94a3b8' }}>
                    <Award size={16} /> 
                    Teacher: {sub.teacherScore !== null ? `${sub.teacherScore}/100` : 'Pending'}
                  </div>
                  
                  {/* Peer Score */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: sub.peerScore !== null ? '#0369a1' : '#94a3b8' }}>
                    <Star size={16} /> 
                    Peers: {sub.peerScore !== null ? `${sub.peerScore}/5.0` : 'Pending'}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THE SUBMISSION MODAL */}
      {isModalOpen && selectedAssignment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={24} /></button>
            <h2 className="modal-title">Submit Assignment</h2>
            <p className="modal-subtitle">{selectedAssignment.title}</p>
            
            <div className="desc-box">
              <div className="desc-title">Assignment Description:</div>
              <div className="desc-text">{selectedAssignment.desc}</div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group-modal">
                <label>Your Submission *</label>
                <textarea 
                  className="textarea-field"
                  placeholder="Enter your assignment content here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  required
                />
                <p className="helper-text">Make sure to review your work before submitting. You cannot edit after submission.</p>
              </div>
              
              <div className="input-group-modal">
                <label style={{ fontSize: '0.9rem' }}>Upload File (Optional)</label>
                <div>
                  <input type="file" id="dashboard-file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                  {!selectedFile ? (
                    <label htmlFor="dashboard-file-upload" className="btn-cyan" style={{ display: 'inline-flex', width: 'fit-content', cursor: 'pointer' }}>
                      <Upload size={16} /> Upload File
                    </label>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', width: 'fit-content' }}>
                      <FileText size={16} color="#0891b2" />
                      <span style={{ fontSize: '0.9rem', color: '#334155', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedFile.name}</span>
                      <button type="button" onClick={() => setSelectedFile(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', padding: '2px' }}><X size={16} /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-teal"><Send size={16} /> Submit Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;