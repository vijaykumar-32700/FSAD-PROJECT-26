import React, { useState } from 'react';
import { FileText, Clock, Upload, Send, X, CheckCircle2, Users, UserPlus, MessageSquare } from 'lucide-react';

const StudentAssignments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Literature Review Essay (Section A)",
      author: "Dr. Sarah Johnson",
      desc: "Analyze and compare three major works from the Romantic period. Discuss themes, writing styles, and historical context.",
      due: "3/4/2026, 2:47:20 pm",
      points: 100,
      daysLeft: "40 days left",
      status: "pending",
      isGroup: false
    },
    {
      id: 2,
      title: "Capstone: Full-Stack Web App (Section A)",
      author: "Dr. Sarah Johnson",
      desc: "Build a complete web application in teams of up to 3 students. You must collaborate on the frontend, backend, and database schema.",
      due: "15/5/2026, 11:59:00 pm",
      points: 300,
      daysLeft: "82 days left",
      status: "pending",
      isGroup: true, 
      teamMembers: ["Aria Moore (You)", "Lily Walker"], 
      teamFiles: [
        { id: 1001, name: "backend_api_draft.js", uploader: "Lily Walker", time: "Yesterday, 2:30 PM" }
      ]
    },
    {
      id: 3,
      title: "Research Paper: Climate Change Impact (Section A)",
      author: "Dr. Sarah Johnson",
      desc: "Write a comprehensive research paper analyzing the impact of climate change on coastal ecosystems.",
      due: "24/3/2026, 2:47:20 pm",
      points: 100,
      daysLeft: "0 days left",
      status: "submitted",
      isGroup: false,
      submissionText: "Attached is my final draft.",
      submissionDate: "22/2/2026, 3:15:12 pm"
    }
  ]);

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setSubmissionText('');
    setSelectedFile(null);
    setNewMemberEmail('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (selectedAssignment.isGroup) {
        const newFile = {
          id: Date.now(),
          name: e.target.files[0].name,
          uploader: "Aria Moore (You)",
          time: "Just now"
        };
        
        setAssignments(assignments.map(a => 
          a.id === selectedAssignment.id ? { ...a, teamFiles: [...a.teamFiles, newFile] } : a
        ));
        
        setSelectedAssignment({
          ...selectedAssignment,
          teamFiles: [...selectedAssignment.teamFiles, newFile]
        });
      } else {
        setSelectedFile(e.target.files[0]);
      }
    }
  };

  const handleDeleteTeamFile = (fileId) => {
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? { ...a, teamFiles: a.teamFiles.filter(f => f.id !== fileId) } : a
    ));
    setSelectedAssignment({
      ...selectedAssignment,
      teamFiles: selectedAssignment.teamFiles.filter(f => f.id !== fileId)
    });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? { ...a, teamMembers: [...a.teamMembers, newMemberEmail] } : a
    ));
    setSelectedAssignment({
      ...selectedAssignment,
      teamMembers: [...selectedAssignment.teamMembers, newMemberEmail]
    });
    setNewMemberEmail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString('en-GB'); 
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id 
        ? { ...a, status: 'submitted', submissionText: submissionText, submissionDate: date } 
        : a
    ));
    closeModal();
  };

  const pendingList = assignments.filter(a => a.status === 'pending');
  const submittedList = assignments.filter(a => a.status === 'submitted');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Assignments</h1>
        <p>View and submit your individual and group assignments</p>
      </div>

      <h2 className="section-header">Not Submitted ({pendingList.length})</h2>
      
      {pendingList.length === 0 ? (
        <div className="empty-card" style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
          <CheckCircle2 size={40} color="#10b981" style={{ marginBottom: '1rem' }}/>
          <h3>All caught up!</h3>
          <p>You have no pending assignments.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {pendingList.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header-pending">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h3>{assignment.title}</h3>
                    {assignment.isGroup && (
                      <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={12} /> Group Project
                      </span>
                    )}
                  </div>
                  <p className="card-author">by {assignment.author}</p>
                </div>
                <div className="task-badge-orange">{assignment.daysLeft}</div>
              </div>
              
              <div className="assignment-body">
                <div className="card-desc">{assignment.desc}</div>
                <div className="card-bottom">
                  <div className="card-meta">
                    <span className="meta-item"><Clock size={16} /> Due: {assignment.due}</span>
                    <span className="meta-item"><FileText size={16} /> Worth: {assignment.points} points</span>
                  </div>
                  <button className={assignment.isGroup ? "btn-cyan" : "btn-teal"} onClick={() => openModal(assignment)}>
                    {assignment.isGroup ? <><Users size={16} /> Open Workspace</> : <><Send size={16} /> Submit Assignment</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {submittedList.length > 0 && (
        <>
          <h2 className="section-header">Submitted ({submittedList.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {submittedList.map(assignment => (
              <div key={assignment.id} className="assignment-card submitted">
                <div className="assignment-header-submitted">
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 color="#16a34a" size={20} style={{ marginTop: '2px' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <h3 style={{ color: '#166534', fontSize: '1.1rem', fontWeight: '600' }}>{assignment.title}</h3>
                        {assignment.isGroup && (
                          <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', border: '1px solid #bbf7d0', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={12} /> Group
                          </span>
                        )}
                      </div>
                      <p className="card-author">by {assignment.author}</p>
                    </div>
                  </div>
                  <div className="task-badge-gray">Pending Grade</div>
                </div>

                <div className="assignment-body" style={{ paddingTop: '0' }}>
                  <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                    {assignment.isGroup ? "Team Submission Notes:" : "Your Submission:"}
                  </p>
                  <div className="submission-box">{assignment.submissionText || "No text submitted."}</div>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Submitted: {assignment.submissionDate}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* DYNAMIC MODAL */}
      {isModalOpen && selectedAssignment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" style={{ maxWidth: selectedAssignment.isGroup ? '850px' : '600px', width: '95%' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={24} /></button>
            
            <h2 className="modal-title">{selectedAssignment.isGroup ? 'Team Workspace' : 'Submit Assignment'}</h2>
            <p className="modal-subtitle">{selectedAssignment.title}</p>
            
            <div className="desc-box">
              <div className="desc-title">Assignment Description:</div>
              <div className="desc-text">{selectedAssignment.desc}</div>
            </div>

            {selectedAssignment.isGroup ? (
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} color="#0284c7"/> Your Team
                  </h3>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedAssignment.teamMembers.map((member, idx) => (
                      <li key={idx} style={{ background: 'white', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                        {member}
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={handleAddMember} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Invite Classmate</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="text" placeholder="Student ID or Email" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }} />
                      <button type="submit" style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0 0.75rem', cursor: 'pointer' }}><UserPlus size={16} /></button>
                    </div>
                  </form>
                </div>

                <div style={{ flex: '2 1 400px' }}>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group-modal" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Shared Team Files
                        <input type="file" id="group-file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                        <label htmlFor="group-file-upload" style={{ color: '#0ea5e9', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Upload size={14}/> Add File
                        </label>
                      </label>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        {selectedAssignment.teamFiles && selectedAssignment.teamFiles.length > 0 ? (
                          selectedAssignment.teamFiles.map(file => (
                            <div key={file.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <FileText size={16} color="#0891b2" />
                                <div>
                                  <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: '500' }}>{file.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Uploaded by {file.uploader} • {file.time}</div>
                                </div>
                              </div>
                              <button type="button" onClick={() => handleDeleteTeamFile(file.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16}/></button>
                            </div>
                          ))
                        ) : (
                          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', padding: '0.5rem 0' }}>No files uploaded yet.</div>
                        )}
                      </div>
                    </div>

                    <div className="input-group-modal">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MessageSquare size={16} color="#0284c7"/> Shared Submission Notes
                      </label>
                      <textarea className="textarea-field" placeholder="Write your group's final notes, findings, or GitHub links here..." value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} required style={{ minHeight: '100px' }} />
                    </div>

                    <div className="modal-actions" style={{ marginTop: '1.5rem', borderTop: 'none', paddingTop: 0 }}>
                      <button type="button" className="btn-cancel" onClick={closeModal}>Close Workspace</button>
                      {/* UPDATED: Changed from Submit Group Project to Submit My Contribution */}
                      <button type="submit" className="btn-teal"><Send size={16} /> Submit My Contribution</button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="input-group-modal">
                  <label>Your Submission *</label>
                  <textarea className="textarea-field" placeholder="Enter your assignment content here..." value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} required />
                  <p className="helper-text">Make sure to review your work before submitting.</p>
                </div>
                
                <div className="input-group-modal">
                  <label style={{ fontSize: '0.9rem' }}>Upload File (Optional)</label>
                  <div>
                    <input type="file" id="individual-file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                    {!selectedFile ? (
                      <label htmlFor="individual-file-upload" className="btn-cyan" style={{ display: 'inline-flex', width: 'fit-content', cursor: 'pointer' }}><Upload size={16} /> Upload File</label>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;