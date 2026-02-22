import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';

const TeacherCalendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); 
  const [selectedDay, setSelectedDay] = useState(24);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get EXACTLY today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

  // Mock Deadlines Data
  const allDeadlines = [
    { id: 1, day: 14, month: 1, year: 2026, title: "Collect Mobile App Designs", target: "Section A & B", time: "11:59 AM", color: "#3b82f6" }, // Past event!
    { id: 2, day: 24, month: 1, year: 2026, title: "Data Analysis Projects Due", target: "All Sections", time: "2:45 PM", color: "#f97316" },
    { id: 3, day: 26, month: 1, year: 2026, title: "Finalize Mid-Term Grades", target: "Administration", time: "5:00 PM", color: "#e11d48" },
    { id: 4, day: 28, month: 1, year: 2026, title: "Publish Peer Review Marks", target: "Section A", time: "8:00 AM", color: "#a855f7" },
    { id: 5, day: 12, month: 2, year: 2026, title: "Grade Mid-Term Exams", target: "All Sections", time: "5:00 PM", color: "#e11d48" }
  ];

  // Exclude past events
  const currentMonthDeadlines = allDeadlines.filter(d => {
    if (d.month !== currentMonth || d.year !== currentYear) return false;
    
    const deadlineDate = new Date(d.year, d.month, d.day);
    return deadlineDate >= today;
  });

  const selectedDeadlines = selectedDay ? currentMonthDeadlines.filter(d => d.day === selectedDay) : [];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Calendar</h1>
        <p>Track your upcoming class deadlines and administrative tasks</p>
      </div>

      <div className="calendar-wrapper">
        {/* LEFT SIDE: CALENDAR GRID */}
        <div className="calendar-card">
          <div className="calendar-top">
            <div className="calendar-title">
              <CalendarIcon size={20} />
              <span>{monthNames[currentMonth]} {currentYear}</span>
            </div>
            <div className="calendar-nav">
              <button className="cal-btn" onClick={handlePrevMonth}><ChevronLeft size={18} /></button>
              <button className="cal-btn" onClick={handleNextMonth}><ChevronRight size={18} /></button>
            </div>
          </div>
          
          <div className="calendar-body">
            <div className="calendar-days-header">
              {daysOfWeek.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            
            <div className="calendar-grid-cells">
              {blanks.map(blank => (
                <div key={`blank-${blank}`} className="cal-cell" style={{ border: 'none', background: 'transparent', cursor: 'default' }}></div>
              ))}

              {days.map(day => {
                const dayDeadlines = currentMonthDeadlines.filter(d => d.day === day);
                const isSelected = day === selectedDay;

                return (
                  <div 
                    key={day} 
                    className={`cal-cell ${isSelected ? 'today' : ''}`}
                    onClick={() => setSelectedDay(day)}
                    style={{ 
                      cursor: 'pointer', 
                      position: 'relative',
                      backgroundColor: isSelected ? '#f0fdfa' : dayDeadlines.length > 0 ? '#f8fafc' : 'transparent',
                      borderColor: isSelected ? '#2dd4bf' : '#e2e8f0',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontWeight: isSelected || dayDeadlines.length > 0 ? '600' : '400' }}>
                      {day}
                    </span>
                    
                    {dayDeadlines.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: 'auto', justifyContent: 'center', paddingBottom: '4px' }}>
                        {dayDeadlines.map((dl, i) => (
                          <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dl.color }} title={dl.title}></div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: UPCOMING DEADLINES SIDEBAR */}
        <div className="sidebar-card">
          <div className="sidebar-header">
            <h3>Administrative Schedule</h3>
            <p>{selectedDay ? `Your timeline for ${monthNames[currentMonth]} ${selectedDay}, ${currentYear}` : 'Select a date to view schedule'}</p>
          </div>
          
          <div className="sidebar-content" style={{ padding: selectedDeadlines.length > 0 ? '1.5rem' : '2rem', display: 'flex', flexDirection: 'column', justifyContent: selectedDeadlines.length > 0 ? 'flex-start' : 'center' }}>
            
            {!selectedDay || selectedDeadlines.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b' }}>
                <CalendarIcon size={56} strokeWidth={1.5} style={{ margin: '0 auto' }} />
                <p style={{ marginTop: '1rem', fontSize: '1.05rem' }}>
                  {!selectedDay ? "Select a date on the calendar" : "No upcoming deadlines"}
                </p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8 }}>
                  {!selectedDay ? "to see details." : "No tasks scheduled for today."}
                </p>
              </div>
            ) : (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedDeadlines.map((item) => (
                  <div key={item.id} style={{ 
                    background: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderLeft: `4px solid ${item.color}`, 
                    borderRadius: '8px', 
                    padding: '1.25rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    textAlign: 'left'
                  }}>
                    <h4 style={{ color: '#0f172a', fontSize: '1.05rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                      {item.title}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem' }}>
                        <Users size={14} style={{ color: item.color }}/> {item.target}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem' }}>
                        <Clock size={14} style={{ color: item.color }}/> Deadline: {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherCalendar;