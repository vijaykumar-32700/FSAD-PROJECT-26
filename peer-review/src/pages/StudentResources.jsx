import React, { useState } from 'react';
import { FileText, Download, MonitorPlay, BookOpen } from 'lucide-react';

const StudentResources = () => {
  const [filter, setFilter] = useState('All Resources');

  const resources = [
    {
      id: 1,
      title: "Peer Review Best Practices Guide",
      desc: "Learn how to provide effective and constructive feedback",
      type: "Guides",
      format: "PDF",
      downloads: 45,
      bgStyle: "#fdf2f8", // Light Pink
      borderStyle: "#fbcfe8"
    },
    {
      id: 2,
      title: "Research Paper Writing Tips",
      desc: "Step-by-step guide for academic writing",
      type: "Templates",
      format: "DOC",
      downloads: 67,
      bgStyle: "#f0f9ff", // Light Blue
      borderStyle: "#bae6fd"
    },
    {
      id: 3,
      title: "Citation Style Guide",
      desc: "APA, MLA, and Chicago citation formats",
      type: "Guides",
      format: "PDF",
      downloads: 89,
      bgStyle: "#fdf2f8", // Light Pink
      borderStyle: "#fbcfe8"
    },
    {
      id: 4,
      title: "Academic Writing Workshop",
      desc: "Video tutorial on effective academic writing",
      type: "Tutorials",
      format: "VIDEO",
      downloads: 34,
      bgStyle: "#f5f3ff", // Light Purple
      borderStyle: "#ddd6fe"
    }
  ];

  const filteredResources = filter === 'All Resources' 
    ? resources 
    : resources.filter(r => r.type === filter);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>All Resources</h1>
        <p style={{ color: '#64748b' }}>Browse all available learning materials</p>
      </div>

      {/* FILTER PILLS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['All Resources', 'Guides', 'Templates', 'Tutorials'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              border: filter === cat ? '2px solid #0f172a' : '1px solid #cbd5e1',
              background: filter === cat ? '#f8fafc' : 'white',
              color: filter === cat ? '#0f172a' : '#475569',
              fontWeight: filter === cat ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.95rem'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESOURCES GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map((item) => (
          <div key={item.id} style={{ background: item.bgStyle, border: `1px solid ${item.borderStyle}`, borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1.25rem' }}>
            
            <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', height: 'fit-content', border: `1px solid ${item.borderStyle}` }}>
              {item.format === 'VIDEO' ? <MonitorPlay size={28} color="#a855f7" /> : 
               item.type === 'Guides' ? <FileText size={28} color="#3b82f6" /> : 
               <BookOpen size={28} color="#0ea5e9" />}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>{item.desc}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ border: '1px solid #cbd5e1', background: 'white', color: '#475569', padding: '0.15rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                  {item.type === 'Guides' ? 'GUIDE' : item.type === 'Templates' ? 'TEMPLATE' : 'TUTORIAL'}
                </span>
                <span style={{ border: '1px solid #cbd5e1', background: 'white', color: '#475569', padding: '0.15rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                  {item.format}
                </span>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>{item.downloads} downloads</div>

              <button style={{ background: '#a855f7', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#9333ea'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#a855f7'}
              >
                <Download size={18} /> Download
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentResources;