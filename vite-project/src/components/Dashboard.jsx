import { useState, useEffect } from "react";
import { useCoins } from "../context/CoinContext.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  const { role, setRole, studentCoins, tutorCoins, simulateStudentAction, simulateTutorAction, streaks } = useCoins();
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    tasks: 0,
    completed: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tutors] = useState([
    { id: 1, name: "Alice Tan", subject: "Mathematics", experience: 5, rating: 4.8, description: "Alice specializes in algebra, calculus, and competition math. She focuses on problem-solving strategies and building strong fundamentals." },
    { id: 2, name: "Benjamin Lee", subject: "Physics", experience: 7, rating: 4.9, description: "Benjamin makes physics intuitive with visuals and real-world examples. Experienced in IGCSE, A-Levels, and AP curricula." },
    { id: 3, name: "Carmen Ong", subject: "Chemistry", experience: 4, rating: 4.7, description: "Carmen simplifies complex concepts in organic and physical chemistry. Provides concise notes and practice questions." },
    { id: 4, name: "Daniel Wong", subject: "English", experience: 6, rating: 4.6, description: "Daniel improves grammar, writing, and literature analysis with structured frameworks and plenty of feedback." },
    { id: 5, name: "Evelyn Lim", subject: "Biology", experience: 3, rating: 4.5, description: "Evelyn teaches exam-oriented biology with diagrams and active recall. Great for secondary to pre-university levels." },
  ]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        users: 1247,
        projects: 89,
        tasks: 156,
        completed: 142
      });
      
      setRecentActivity([
        { id: 1, action: "New user registered", time: "2 minutes ago", type: "user" },
        { id: 2, action: "Project 'Website Redesign' completed", time: "1 hour ago", type: "project" },
        { id: 3, action: "Task 'Update documentation' assigned", time: "3 hours ago", type: "task" },
        { id: 4, action: "New feature 'Dark Mode' deployed", time: "5 hours ago", type: "feature" }
      ]);
      
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return '👤';
      case 'project': return '📁';
      case 'task': return '✅';
      case 'feature': return '🚀';
      default: return '📝';
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Loading your data...</p>
        </div>
        <div className="loading-spinner">⏳</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome back! 👋</h2>
        <p>Here's what's happening with your projects today</p>
        <div className="role-bar">
          <label className="role-label">Role:</label>
          <select className="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
          <span className="coin-badge student">Student Coins: {studentCoins}</span>
          <span className="coin-badge tutor">Tutor Coins: {tutorCoins}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.users.toLocaleString()}</h3>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>{stats.projects}</h3>
            <p>Active Projects</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.tasks}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="tutors-panel">
          <h3>Find Your Tutor</h3>
          <div className="tutor-grid">
            {tutors.map(t => (
              <div key={t.id} className="tutor-card">
                <div className="tutor-header">
                  <div className="avatar" aria-hidden>👩‍🏫</div>
                  <div>
                    <div className="tutor-name">{t.name}</div>
                    <div className="tutor-subject">{t.subject}</div>
                  </div>
                </div>
                <div className="tutor-meta">
                  <span>Experience: {t.experience} yrs</span>
                  <span className="rating">⭐ {t.rating}</span>
                </div>
                <button className="action-btn primary" onClick={() => setSelectedTutor(t)}>Learn More</button>
              </div>
            ))}
          </div>
        </div>
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-details">
                  <p className="activity-action">{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">➕ New Project</button>
            <button className="action-btn secondary">📊 View Reports</button>
            <button className="action-btn secondary">⚙️ Settings</button>
            <button className="action-btn secondary">📧 Send Message</button>
          </div>

          <h3 style={{ marginTop: 24 }}>Earning Actions</h3>
          {role === "student" ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="action-btn primary" onClick={() => simulateStudentAction("attend_session")}>Attend a tutoring session</button>
              <button className="action-btn secondary" onClick={() => simulateStudentAction("complete_assignment")}>Complete assignment/quiz</button>
              <button className="action-btn secondary" onClick={() => simulateStudentAction("give_feedback")}>Give useful feedback</button>
              <button className="action-btn secondary" onClick={() => simulateStudentAction("daily_login")}>Daily login</button>
              <button className="action-btn secondary" onClick={() => simulateStudentAction("weekly_streak_completed")}>Weekly attendance streak</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="action-btn primary" onClick={() => simulateTutorAction("conduct_session")}>Conduct a tutoring session</button>
              <button className="action-btn secondary" onClick={() => simulateTutorAction("positive_rating")}>Receive positive rating</button>
              <button className="action-btn secondary" onClick={() => simulateTutorAction("consistency_bonus")}>Consistency bonus</button>
              <button className="action-btn secondary" onClick={() => simulateTutorAction("upload_material")}>Upload extra materials</button>
              <button className="action-btn secondary" onClick={() => simulateTutorAction("student_engagement")}>Student engagement bonus</button>
            </div>
          )}
          {role === "student" ? (
            <div className="streak-bar">
              <span className="streak-item">
                <span className="streak-label">Daily Login Streak</span>
                <span className="streak-value">{streaks.dailyLogin || 0}</span>
              </span>
              <span className="streak-item">
                <span className="streak-label">Weekly Attendance</span>
                <span className="streak-value">{streaks.weeklyAttendance || 0}</span>
              </span>
            </div>
          ) : (
            <div className="streak-bar">
              <span className="streak-item">
                <span className="streak-label">Tutor Consistency Streak</span>
                <span className="streak-value">{streaks.tutorConsistency || 0}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {selectedTutor && (
        <div className="modal-overlay" onClick={() => setSelectedTutor(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="avatar lg" aria-hidden>👩‍🏫</div>
              <div>
                <div className="tutor-name">{selectedTutor.name}</div>
                <div className="tutor-subject">{selectedTutor.subject}</div>
              </div>
              <button className="modal-close" onClick={() => setSelectedTutor(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>{selectedTutor.description}</p>
              <div className="tutor-meta" style={{ marginTop: 12 }}>
                <span>Experience: {selectedTutor.experience} yrs</span>
                <span className="rating">⭐ {selectedTutor.rating}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="action-btn secondary" onClick={() => setSelectedTutor(null)}>Close</button>
              <button className="action-btn primary">Join Class</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
