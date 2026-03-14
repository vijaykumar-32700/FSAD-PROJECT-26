import React, { useState } from 'react';
import { MessageSquare, Star, CheckCircle2, X, Send, UserCircle, FileText } from 'lucide-react';

const StudentPeerReviews = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [score, setScore] = useState('');

  // NEW: State to control the popup notification
  const [toast, setToast] = useState(null);

  // Distinct Mock Data for Peer Reviews (Fully Restored!)
  const [peerReviews, setPeerReviews] = useState([
    {
      id: 101,
      assignmentTitle: "Psychology Case Study: Behavioral Analysis",
      peerId: "Anonymous Peer #4092",
      submissionText: "In this case study, the subject exhibited clear signs of operant conditioning. By introducing positive reinforcement when the subject completed the puzzle, their completion time decreased by 40% over two weeks. However, I believe environmental factors in the testing room may have skewed the initial baseline data.",
      dueDate: "28/3/2026",
      maxPoints: 50,
      status: "pending"
    },
    {
      id: 102,
      assignmentTitle: "World History: Industrial Revolution Essay",
      peerId: "Anonymous Peer #1184",
      submissionText: "The Industrial Revolution dramatically shifted the socio-economic landscape of 18th century Britain. While it introduced mass production and economic growth, it simultaneously led to severe urban overcrowding and poor labor conditions. The transition from agrarian societies to urban centers fundamentally changed the family dynamic.",
      dueDate: "30/3/2026",
      maxPoints: 100,
      status: "pending"
    },
    {
      id: 103,
      assignmentTitle: "Creative Writing: Short Story Draft",
      peerId: "Anonymous Peer #8832",
      submissionText: "The neon lights flickered against the wet pavement. Detective Vance pulled his collar up against the biting wind, staring at the empty alleyway. 'They were just here,' he muttered to himself. A single red matchbook lay near the storm drain, the only clue left behind in the silent city.",
      dueDate: "Past Due",
      maxPoints: 100,
      status: "completed",
      givenScore: 92,
      givenFeedback: "Excellent imagery and tone! You really captured the noir atmosphere. To improve, try showing Vance's internal thoughts a bit more rather than just having him speak aloud."
    }
  ]);

  // NEW: Function to trigger the popup
  const showToast = (title, subtitle) => {
    setToast({ title, subtitle });
    setTimeout(() => {
      setToast(null);
    }, 3000); // Disappears after 3 seconds
  };

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    setFeedbackText('');
    setScore('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update the review status to 'completed' and save the user's feedback
    setPeerReviews(peerReviews.map(r => 
      r.id === selectedReview.id 
        ? { ...r, status: 'completed', givenScore: score, givenFeedback: feedbackText } 
        : r
    ));
    closeModal();

    // Trigger the success popup!
    showToast("Review Submitted Successfully!", "Your feedback has been recorded.");
  };

  const pendingReviews = peerReviews.filter(r => r.status === 'pending');
  const completedReviews = peerReviews.filter(r => r.status === 'completed');

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

      <div className="dashboard-header">
        <h1>Peer Reviews</h1>
        <p>Review your classmates' work and provide constructive feedback</p>
      </div>

      {/* PENDING REVIEWS SECTION */}
      <h2 className="section-header">Needs Your Review ({pendingReviews.length})</h2>
      
      {pendingReviews.length === 0 ? (
        <div className="empty-card" style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
          <CheckCircle2 size={40} color="#10b981" style={{ marginBottom: '1rem' }}/>
          <h3>You're all caught up!</h3>
          <p>No new peer submissions require your review at this time.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {pendingReviews.map(review => (
            <div key={review.id} className="assignment-card">
              
              <div className="assignment-header-pending" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <h3 style={{ color: '#0f172a', fontSize: '1.1rem' }}>{review.assignmentTitle}</h3>
                  <div className="meta-item" style={{ marginTop: '0.4rem', color: '#6366f1', fontWeight: '600' }}>
                    <UserCircle size={16} />
                    <span>{review.peerId}</span>
                  </div>
                </div>
                <div className="task-badge-orange" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>Action Required</div>
              </div>
              
              <div className="assignment-body" style={{ paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#475569', fontWeight: '600' }}>
                  <FileText size={16} /> Peer's Submission Excerpt:
                </div>
                <div className="submission-box" style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#334155', borderLeft: '3px solid #cbd5e1' }}>
                  "{review.submissionText}"
                </div>
                
                <div className="card-bottom">
                  <div className="card-meta">
                    <span className="meta-item" style={{ color: '#ef4444' }}>Review Due: {review.dueDate}</span>
                    <span className="meta-item">Max Score: {review.maxPoints} pts</span>
                  </div>
                  <button className="btn-teal" style={{ backgroundColor: '#6366f1' }} onClick={() => openModal(review)}>
                    <Star size={16} /> Evaluate Peer
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}

      {/* COMPLETED REVIEWS SECTION */}
      {completedReviews.length > 0 && (
        <>
          <h2 className="section-header">Completed Reviews ({completedReviews.length})</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {completedReviews.map(review => (
              <div key={review.id} className="assignment-card submitted" style={{ backgroundColor: '#f0fdfa', borderColor: '#ccfbf1' }}>
                
                <div className="assignment-header-submitted">
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 color="#0d9488" size={20} style={{ marginTop: '2px' }} />
                    <div>
                      <h3 style={{ color: '#0f766e', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {review.assignmentTitle}
                      </h3>
                      <div className="meta-item" style={{ color: '#0d9488', opacity: 0.8 }}>
                        <UserCircle size={14} />
                        <span>{review.peerId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="task-badge-gray" style={{ background: '#ccfbf1', color: '#0f766e', fontSize: '0.85rem' }}>
                    Given Score: {review.givenScore}/{review.maxPoints}
                  </div>
                </div>

                <div className="assignment-body" style={{ paddingTop: '0' }}>
                  <p style={{ fontWeight: '600', color: '#0f766e', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Your Feedback:</p>
                  <div className="submission-box" style={{ background: 'white', borderColor: '#99f6e4', color: '#334155' }}>
                    {review.givenFeedback}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PEER REVIEW MODAL OVERLAY */}
      {isModalOpen && selectedReview && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={24} /></button>
            <h2 className="modal-title">Evaluate Peer Submission</h2>
            <p className="modal-subtitle">{selectedReview.assignmentTitle}</p>
            
            <div className="desc-box" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
              <div className="desc-title" style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserCircle size={16}/> {selectedReview.peerId}'s Work:
              </div>
              <div className="desc-text" style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>"{selectedReview.submissionText}"</div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                {/* Score Input */}
                <div className="input-group-modal">
                  <label>Score (0-{selectedReview.maxPoints})</label>
                  <input 
                    type="number" 
                    min="0"
                    max={selectedReview.maxPoints}
                    className="textarea-field"
                    style={{ minHeight: '45px', padding: '0.5rem' }}
                    placeholder={`/${selectedReview.maxPoints}`}
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                  />
                </div>

                {/* Feedback Input */}
                <div className="input-group-modal">
                  <label>Constructive Feedback *</label>
                  <textarea 
                    className="textarea-field"
                    placeholder="Provide helpful, respectful feedback. Highlight what they did well and suggest areas for improvement..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-teal" style={{ backgroundColor: '#6366f1' }}><Send size={16} /> Submit Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPeerReviews;