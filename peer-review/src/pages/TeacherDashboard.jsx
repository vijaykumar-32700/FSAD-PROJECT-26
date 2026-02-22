import React, { useState } from 'react';
import { FileText, Users, Clock, MessageSquare, UserCircle, X, Send, Award, CheckCircle2 } from 'lucide-react';

const TeacherDashboard = () => {
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  // Dynamic state for the "Pending to grade" stat card
  const [pendingCount, setPendingCount] = useState(12);

  // Mock Data: Submissions
  const [recentSubmissions, setRecentSubmissions] = useState([
    {
      id: 1,
      student: "Aria Moore",
      studentId: "STU-0000",
      assignment: "Data Analysis Project (Section A)",
      submittedAt: "Today, 10:45 AM",
      status: "Needs Grading",
      content: "I have attached the Jupyter notebook containing my data cleaning steps and the final Matplotlib visualizations. The core finding was a 15% increase in seasonal trends.",
      maxScore: 100
    },
    {
      id: 2,
      student: "Isaac Wright",
      studentId: "STU-1003",
      assignment: "Mobile App Design Document",
      submittedAt: "Yesterday, 4:20 PM",
      status: "Needs Grading",
      content: "Attached are the Figma wireframes and the PDF detailing the user flow for the authentication process.",
      maxScore: 100
    },
    {
      id: 3,
      student: "Evelyn Lopez",
      studentId: "STU-1002",
      assignment: "Research Paper: Climate Change Impact",
      submittedAt: "Yesterday, 1:15 PM",
      status: "Graded",
      content: "Final draft submitted with APA citations.",
      maxScore: 100,
      givenScore: 96,
      givenFeedback: "Excellent research, Evelyn. Your arguments were clear, and the citations were perfectly formatted. Keep up the great work!"
    }
  ]);

  const recentReviews = [
    {
      id: 1,
      reviewer: "Lincoln Young",
      reviewee: "Anonymous #4092",
      assignment: "Data Analysis Project",
      score: "95/100",
      feedback: "Great use of pandas for data cleaning. The visualizations were very clear and easy to understand.",
      time: "2 hours ago"
    },
    {
      id: 2,
      reviewer: "Charlotte Perez",
      reviewee: "Anonymous #1184",
      assignment: "History Essay",
      score: "88/100",
      feedback: "Strong thesis statement, but could use more primary sources in the second paragraph.",
      time: "5 hours ago"
    }
  ];

  // Handlers for Modal
  const openModal = (sub) => {
    setSelectedSubmission(sub);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
    setScore('');
    setFeedback('');
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    
    // Update the submission to "Graded" AND save the score/feedback!
    setRecentSubmissions(recentSubmissions.map(sub => 
      sub.id === selectedSubmission.id 
        ? { ...sub, status: 'Graded', givenScore: score, givenFeedback: feedback } 
        : sub
    ));
    
    // Decrease the pending count in the top stat block
    setPendingCount(prev => prev - 1);
    
    closeModal();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Overview of your classes and assignments</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card card-blue">
          <div className="stat-card-header"><FileText size={18}/> Assignments</div>
          <div className="stat-value">15</div>
          <div className="stat-label">total assignments</div>
        </div>
        
        <div className="stat-card card-purple">
          <div className="stat-card-header"><Users size={18}/> Students</div>
          <div className="stat-value">68</div>
          <div className="stat-label">active students</div>
        </div>
        
        <div className="stat-card card-orange">
          <div className="stat-card-header"><Clock size={18}/> Pending</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">to grade</div>
        </div>
        
        <div className="stat-card card-teal">
          <div className="stat-card-header"><MessageSquare size={18}/> Reviews</div>
          <div className="stat-value">45</div>
          <div className="stat-label">peer reviews</div>
        </div>
      </div>

      <div className="panels-grid">
        
        {/* RECENT SUBMISSIONS PANEL */}
        <div className="panel-card" style={{ padding: 0 }}>
          <div className="panel-title" style={{ margin: 0, borderBottom: '1px solid #e0f2fe', backgroundColor: '#f0f9ff', color: '#0369a1' }}>
            <FileText size={20} /> Recent Submissions
          </div>
          <div className="scrollable-panel">
            {recentSubmissions.map(sub => (
              <div key={sub.id} className="task-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: sub.status === 'Graded' ? '#bbf7d0' : '#e0f2fe', backgroundColor: sub.status === 'Graded' ? '#f8fafc' : 'white' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: '#0f172a', margin: 0, fontSize: '1.05rem' }}>{sub.student}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{sub.studentId}</span>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>{sub.assignment}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem' }}>
                    <span style={{ color: '#64748b' }}>{sub.submittedAt}</span>
                    <span style={{ 
                      color: sub.status === 'Graded' ? '#16a34a' : '#ea580c',
                      fontWeight: '600' 
                    }}>
                      • {sub.status}
                    </span>
                  </div>
                </div>
                
                {/* Dynamically show Grade or View button - BOTH now open the modal! */}
                <button 
                  className={sub.status === 'Graded' ? "btn-cancel" : "btn-cyan"} 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  onClick={() => openModal(sub)}
                >
                  {sub.status === 'Graded' ? 'View' : 'Grade'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT PEER REVIEWS PANEL */}
        <div className="panel-card" style={{ padding: 0 }}>
          <div className="panel-title" style={{ margin: 0, borderBottom: '1px solid #dcfce7', backgroundColor: '#f0fdf4', color: '#166534' }}>
            <MessageSquare size={20} /> Recent Peer Reviews
          </div>
          <div className="scrollable-panel">
            {recentReviews.map(review => (
              <div key={review.id} className="task-card sub-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <UserCircle size={18} color="#0d9488" />
                    <span style={{ fontWeight: '600', color: '#0f766e', fontSize: '0.95rem' }}>{review.reviewer}</span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}> reviewed </span>
                    <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '500' }}>{review.reviewee}</span>
                  </div>
                  <div className="task-badge-gray" style={{ background: '#ccfbf1', color: '#0f766e', fontSize: '0.75rem' }}>
                    Score: {review.score}
                  </div>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <FileText size={12} style={{ display: 'inline', marginRight: '4px' }}/> 
                  {review.assignment}
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem', color: '#334155', fontStyle: 'italic' }}>
                  "{review.feedback}"
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#94a3b8' }}>
                  {review.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DYNAMIC TEACHER GRADING/VIEWING MODAL OVERLAY */}
      {isModalOpen && selectedSubmission && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={24} /></button>
            <h2 className="modal-title">
              {selectedSubmission.status === 'Graded' ? 'View Grade' : 'Grade Submission'}
            </h2>
            <p className="modal-subtitle">
              {selectedSubmission.student} ({selectedSubmission.studentId})
            </p>
            
            <div className="desc-box" style={{ background: '#f8fafc', borderColor: '#e2e8f0', marginBottom: '1.5rem' }}>
              <div className="desc-title" style={{ color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16}/> {selectedSubmission.assignment}
              </div>
              <div className="desc-text" style={{ fontStyle: 'italic', marginTop: '0.75rem', color: '#334155' }}>
                "{selectedSubmission.content}"
              </div>
            </div>
            
            {/* CONDITIONAL RENDER: Form (if pending) vs Static View (if graded) */}
            {selectedSubmission.status === 'Graded' ? (
              
              // === VIEW MODE ===
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                  <div className="input-group-modal">
                    <label>Final Score</label>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.75rem', borderRadius: '6px', color: '#166534', fontWeight: '700', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={20} />
                      {selectedSubmission.givenScore} <span style={{fontSize: '0.9rem', color: '#15803d', fontWeight: '500'}}>/ {selectedSubmission.maxScore}</span>
                    </div>
                  </div>

                  <div className="input-group-modal">
                    <label>Teacher Feedback</label>
                    <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '0.85rem', borderRadius: '6px', color: '#334155', minHeight: '60px', lineHeight: '1.5' }}>
                      {selectedSubmission.givenFeedback}
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions" style={{ borderTop: 'none', paddingTop: '0.5rem' }}>
                  <button type="button" className="btn-cancel" onClick={closeModal}>Close</button>
                </div>
              </div>

            ) : (

              // === GRADING MODE ===
              <form onSubmit={handleGradeSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                  <div className="input-group-modal">
                    <label>Final Score</label>
                    <input 
                      type="number" 
                      min="0"
                      max={selectedSubmission.maxScore}
                      className="textarea-field"
                      style={{ minHeight: '45px', padding: '0.5rem' }}
                      placeholder={`/ ${selectedSubmission.maxScore}`}
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group-modal">
                    <label>Teacher Feedback *</label>
                    <textarea 
                      className="textarea-field"
                      placeholder="Provide official feedback on the student's submission..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn-teal" style={{ backgroundColor: '#0ea5e9' }}>
                    <Award size={16} /> Submit Grade
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherDashboard;