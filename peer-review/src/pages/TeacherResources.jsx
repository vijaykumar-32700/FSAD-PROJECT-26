import React, { useState } from 'react';
import { Plus, Trash2, X, FileText, MonitorPlay, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

const TeacherResources = () => {
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('All Resources');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newResource, setNewResource] = useState({
    title: '',
    desc: '',
    type: 'Guides',
    format: 'PDF',
    link: ''
  });

  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Peer Review Best Practices Guide",
      desc: "Learn how to provide effective and constructive feedback",
      type: "Guides",
      format: "PDF",
      downloads: 45,
      bgStyle: "#fdf2f8", // light pink
      borderStyle: "#fbcfe8"
    },
    {
      id: 2,
      title: "Research Paper Writing Tips",
      desc: "Step-by-step guide for academic writing",
      type: "Templates",
      format: "DOC",
      downloads: 67,
      bgStyle: "#f0f9ff", // light blue
      borderStyle: "#bae6fd"
    },
    {
      id: 3,
      title: "Citation Style Guide",
      desc: "APA, MLA, and Chicago citation formats",
      type: "Guides",
      format: "PDF",
      downloads: 112,
      bgStyle: "#f8fafc", // light gray
      borderStyle: "#e2e8f0"
    },
    {
      id: 4,
      title: "Academic Writing Workshop",
      desc: "Video tutorial on effective academic writing",
      type: "Tutorials",
      format: "VIDEO",
      downloads: 89,
      bgStyle: "#f5f3ff", // light purple
      borderStyle: "#ddd6fe"
    }
  ]);

  const showToast = (title, subtitle) => {
    setToast({ title, subtitle });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewResource({ title: '', desc: '', type: 'Guides', format: 'PDF', link: '' });
  };

  const handleCreateResource = (e) => {
    e.preventDefault();
    const resourceToAdd = {
      ...newResource,
      id: Date.now(),
      downloads: 0,
      bgStyle: "#f0fdf4", // new resources get a light green bg
      borderStyle: "#bbf7d0"
    };
    setResources([resourceToAdd, ...resources]);
    handleCloseModal();
    showToast("Resource Added Successfully!", "Students can now access this material.");
  };

  const handleDelete = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const filteredResources = filter === 'All Resources' 
    ? resources 
    : resources.filter(r => r.type === filter);

  // Calculate stats
  const totalResources = resources.length;
  const totalDocs = resources.filter(r => r.format === 'PDF' || r.format === 'DOC').length;
  const totalVideos = resources.filter(r => r.format === 'VIDEO').length;
  const totalLinks = resources.filter(r => r.format === 'LINK').length;

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
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#0f172a' }}>Resources</h1>
          <p style={{ color: '#64748b' }}>Manage learning materials and guides for your classes</p>
        </div>
        <button className="btn-teal" onClick={handleOpenModal} style={{ background: '#10b981', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
          <Plus size={18} /> Add Resource
        </button>
      </div>

      {/* STATS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#0ea5e9', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(14, 165, 233, 0.2)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total Resources</div>
          <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: '1' }}>{totalResources}</div>
        </div>
        <div style={{ background: '#d946ef', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(217, 70, 239, 0.2)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Documents</div>
          <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: '1' }}>{totalDocs}</div>
        </div>
        <div style={{ background: '#22c55e', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(34, 197, 94, 0.2)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Videos</div>
          <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: '1' }}>{totalVideos}</div>
        </div>
        <div style={{ background: '#f97316', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(249, 115, 22, 0.2)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>External Links</div>
          <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: '1' }}>{totalLinks}</div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {['All Resources', 'Guides', 'Templates', 'Tutorials'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              border: filter === cat ? '1px solid #94a3b8' : '1px solid transparent',
              background: filter === cat ? 'white' : 'transparent',
              color: filter === cat ? '#0f172a' : '#64748b',
              fontWeight: filter === cat ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESOURCE CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {filteredResources.map((item) => (
          <div key={item.id} style={{ background: item.bgStyle, border: `1px solid ${item.borderStyle}`, borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1rem', position: 'relative' }}>
            
            <button 
              onClick={() => handleDelete(item.id)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              <Trash2 size={18} />
            </button>

            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '8px', height: 'fit-content', border: `1px solid ${item.borderStyle}` }}>
              {item.format === 'VIDEO' ? <MonitorPlay size={24} color="#8b5cf6" /> : 
               item.format === 'LINK' ? <LinkIcon size={24} color="#f97316" /> : 
               <FileText size={24} color="#0ea5e9" />}
            </div>

            <div>
              <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.4rem', paddingRight: '2rem' }}>{item.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.desc}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ border: '1px solid #cbd5e1', background: 'white', color: '#475569', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>{item.type}</span>
                <span style={{ border: '1px solid #cbd5e1', background: 'white', color: '#475569', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>{item.format}</span>
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.downloads} student downloads</div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD RESOURCE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close" onClick={handleCloseModal}><X size={24} /></button>
            <h2 className="modal-title">Add New Resource</h2>
            <p className="modal-subtitle">Upload a file or link for your students</p>

            <form onSubmit={handleCreateResource}>
              <div className="input-group-modal">
                <label>Resource Title *</label>
                <input 
                  type="text" 
                  className="textarea-field" 
                  style={{ minHeight: '45px', padding: '0 0.75rem' }}
                  placeholder="e.g., Chapter 1 Study Guide"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  required 
                />
              </div>

              <div className="input-group-modal">
                <label>Description *</label>
                <textarea 
                  className="textarea-field" 
                  placeholder="Briefly describe what this resource is..."
                  value={newResource.desc}
                  onChange={(e) => setNewResource({...newResource, desc: e.target.value})}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group-modal">
                  <label>Category</label>
                  <select 
                    className="textarea-field" 
                    style={{ minHeight: '45px', padding: '0 0.75rem' }}
                    value={newResource.type}
                    onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                  >
                    <option value="Guides">Guides</option>
                    <option value="Templates">Templates</option>
                    <option value="Tutorials">Tutorials</option>
                  </select>
                </div>
                <div className="input-group-modal">
                  <label>Format</label>
                  <select 
                    className="textarea-field" 
                    style={{ minHeight: '45px', padding: '0 0.75rem' }}
                    value={newResource.format}
                    onChange={(e) => setNewResource({...newResource, format: e.target.value})}
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOC">Word Document</option>
                    <option value="VIDEO">Video Link</option>
                    <option value="LINK">External Link</option>
                  </select>
                </div>
              </div>

              <div className="input-group-modal">
                <label>File Upload or Link URL</label>
                <input 
                  type="text" 
                  className="textarea-field" 
                  style={{ minHeight: '45px', padding: '0 0.75rem' }}
                  placeholder="Paste URL or click to upload file..."
                  value={newResource.link}
                  onChange={(e) => setNewResource({...newResource, link: e.target.value})}
                />
              </div>

              <div className="modal-actions" style={{ borderTop: 'none', paddingTop: '1rem' }}>
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn-teal" style={{ background: '#10b981', color: 'white' }}>
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherResources;