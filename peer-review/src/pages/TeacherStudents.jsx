import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const TeacherStudents = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('A');
  const [searchQuery, setSearchQuery] = useState('');

  const allStudents = [
    { id: 1, idNumber: "STU-1001", initials: "EL", name: "Evelyn Lopez", email: "evelyn.lopez1@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 2, idNumber: "STU-1002", initials: "SH", name: "Savannah Hernandez", email: "savannah.hernandez2@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 3, idNumber: "STU-1003", initials: "IW", name: "Isaac Wright", email: "isaac.wright3@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 4, idNumber: "STU-1004", initials: "CP", name: "Charlotte Perez", email: "charlotte.perez4@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 5, idNumber: "STU-1005", initials: "LY", name: "Lincoln Young", email: "lincoln.young5@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 6, idNumber: "STU-1006", initials: "PR", name: "Penelope Ramirez", email: "penelope.ramirez6@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 7, idNumber: "STU-1007", initials: "VW", name: "Victoria Williams", email: "victoria.williams7@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 8, idNumber: "STU-1008", initials: "LA", name: "Leah Anderson", email: "leah.anderson8@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 9, idNumber: "STU-1009", initials: "SN", name: "Sophia Nguyen", email: "sophia.nguyen9@school.edu", section: "A", subs: 0, reviews: 0, grade: "0.0%" },
    { id: 10, idNumber: "STU-2001", initials: "JD", name: "John Doe", email: "john.doe@school.edu", section: "B", subs: 1, reviews: 2, grade: "85.0%" },
  ];

  const filteredStudents = allStudents.filter(student => {
    const matchesSection = student.section === activeSection;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = student.name.toLowerCase().includes(searchLower) || student.idNumber.toLowerCase().includes(searchLower);
    return matchesSection && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Students</h1>
        <p>Overview of student performance across sections</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card card-magenta"><div className="stat-card-header">Total Students</div><div className="stat-value">220</div></div>
        <div className="stat-card card-blue"><div className="stat-card-header">Sections</div><div className="stat-value">3</div></div>
        <div className="stat-card card-green"><div className="stat-card-header">Total Submissions</div><div className="stat-value">0</div></div>
        <div className="stat-card card-orange"><div className="stat-card-header">Peer Reviews</div><div className="stat-value">0</div></div>
      </div>
      <div className="students-filter-row">
        <div className="section-tabs">
          <button className={`sec-tab ${activeSection === 'A' ? 'active' : ''}`} onClick={() => setActiveSection('A')}>Section A (68)</button>
          <button className={`sec-tab ${activeSection === 'B' ? 'active' : ''}`} onClick={() => setActiveSection('B')}>Section B (77)</button>
          <button className={`sec-tab ${activeSection === 'C' ? 'active' : ''}`} onClick={() => setActiveSection('C')}>Section C (75)</button>
        </div>
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by ID (e.g. STU-1001) or Name..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="section-label">Section {activeSection} - {filteredStudents.length} Students found</div>
      <div className="students-grid">
        {filteredStudents.map((student) => (
          <div key={student.id} className="student-card">
            <div className="stu-card-header">
              <div className="stu-avatar">{student.initials}</div>
              <div className="stu-info">
                <h3>{student.name}</h3><p>{student.email}</p><span className="stu-id-tag">ID: {student.idNumber}</span>
              </div>
            </div>
            <div className="stu-stats">
              <div className="stu-stat-row"><span>Submissions</span><span className="stu-stat-val cyan">{student.subs}</span></div>
              <div className="stu-stat-row"><span>Reviews Given</span><span className="stu-stat-val green">{student.reviews}</span></div>
              <div className="stu-stat-row"><span>Average Grade</span><span className="stu-stat-badge">{student.grade}</span></div>
            </div>
            
            {/* Navigates to the student-profile route AND sends the data! */}
            <button 
              className="btn-view-profile" 
              onClick={() => navigate('/teacher/student-profile', { state: { student } })}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherStudents;