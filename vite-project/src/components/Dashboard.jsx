import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoins } from "../context/CoinContext.jsx";
import LessonPage from "../pages/LessonPage.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  const rawUser = localStorage.getItem("auth-user");
  const currentUser = rawUser ? JSON.parse(rawUser) : null;

  const { role, setRole, studentCoins, tutorCoins, simulateStudentAction, simulateTutorAction, streaks } = useCoins();

  const ran = useRef(false);
  const navigate = useNavigate();

  const [hasLoggedInToday, setHasLoggedInToday] = useState(false);

  const addActivity = (actionText, type = "user") => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRecentActivity(prev => [
      { id: prev.length + 1, action: actionText, time: timeString, type },
      ...prev
    ]);
  };

  const [tutorEarnings, setTutorEarnings] = useState({
    session: 0,
    upload_material: 0,
    positive_rating: 0,
    consistency_bonus: 0,
    engagement: 0,
  });

  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([]);

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setAiMessages(prev => [...prev, { type: "user", text: aiInput }]);

    setTimeout(() => {
      setAiMessages(prev => [...prev, { type: "ai", text: "🤖 Here's a helpful tip for you!" }]);
    }, 800);

    setAiInput("");
  };

  const [sessions, setSessions] = useState([
    {
    id: 1,
    tutor: "Alice Tan",
    student: "Elson",
    subject: "Math",
    date: "2025-09-06",
    time: "15:00",
    type: "live",
    status: "completed",
    feedback: null,
    }
  ]);

  useEffect(() => {
    const lastLogin = localStorage.getItem("last-daily-login");
    const today = new Date().toDateString();
    if (lastLogin === today) {
      setHasLoggedInToday(true);
    }
  }, []);

  const handleDailyLogin = () => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem("last-daily-login");

    if (lastLogin === today) {
      alert("You've already checked in today!");
      return;
    }

    localStorage.setItem("last-daily-login", today);
    setHasLoggedInToday(true); // disable button

    simulateStudentAction("daily_login"); // updates coins + streaks

    addActivity("Checked in for daily login", "user");

    alert("🎉 Daily login successful! Coins awarded.");
  };

  const [selectedAction, setSelectedAction] = useState("");

  const [assignments, setAssignments] = useState([
    { id: 1, title: "Math Quiz 1", completed: false },
    { id: 2, title: "Science Homework", completed: false },
    { id: 3, title: "English Essay", completed: false },
  ]);

  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    if (ran.current) return;  
    ran.current = true;

    const raw = localStorage.getItem("auth-user");
    if (!raw) {
      alert("Please log in to access the dashboard.");
      navigate("/login");
    }
  }, [navigate]);

  const [stats, setStats] = useState({
    users: 0,
    tutors: 0,
    sessions: 0,
    satisfaction: 0
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

  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        users: 1247,      // total users on platform
        tutors: 320,      // number of tutors
        sessions: 156,    // tutoring sessions this month
        satisfaction: 95  // satisfaction rate 
      });
      
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash === "#tutors") {
      const el = document.getElementById("tutors");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "session": return "📅";
      case "upload": return "📚";
      case "coins": return "💰";
      case "user": return "👤";
      default: return "📝";
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
        <h2>Welcome back, {currentUser?.fullName || "Learner"}! 👋</h2>
        <p>Check your upcoming sessions, achievements, and rewards for today 📚✨</p>
        <div className="role-bar">
          <label className="role-label">Role:</label>
          <select
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
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
            <p>Total Learners</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>{stats.tutors}</h3>
            <p>Active Tutors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.sessions}</h3>
            <p>Sessions This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.satisfaction}%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div id="tutors" className="tutors-panel">
          <h3>Find Your Tutor</h3>
          <div className="tutor-grid">
            {tutors
              .filter((t) => {
                const params = new URLSearchParams(window.location.search);
                const q = (params.get("q") || "").toLowerCase();
                if (!q) return true;
                return t.subject.toLowerCase().includes(q) || t.name.toLowerCase().includes(q);
              })
              .map(t => (
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

            {role === "student" ? (
              <div className="action-buttons">
                <button 
                  className="action-btn primary"
                  onClick={() => {
                  navigate("/dashboard#tutors"); 
                }}
                >🔍 Find a Tutor</button>
                <button
                  className="action-btn secondary"
                  onClick={() => setAiOpen(true)}
                >
                  🤖 AI Assistant
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setSelectedAction("assignments")}
                >📚 View Assignments</button>
                <button 
                  className="action-btn secondary"
                  onClick={() => navigate("/rewards")}
                >
                  💰 Redeem Rewards
                </button>
                <button
                  className="action-btn secondary"
                  onClick={() => setSelectedAction("view_schedule")}
                >
                  🗓 My Schedule
                </button>
              </div>
            ) : (
              <div className="action-buttons">
                <button className="action-btn primary" onClick={() => setSelectedAction("conduct_session")}>📅 Start a Session</button>
                <button className="action-btn secondary" onClick={() => setAiOpen(true)}>🤖 AI Assistant</button>
                <button className="action-btn secondary" onClick={() => setSelectedAction("upload_material")}>📤 Upload Materials</button>
                <button className="action-btn secondary" onClick={() => setSelectedAction("view_earnings")}>📊 View Earnings</button>
                <button className="action-btn secondary" onClick={() => setSelectedAction("respond_feedback")}>💬 Respond to Feedback</button>
                <button
                  className="action-btn secondary"
                  onClick={() => setSelectedAction("view_schedule")}
                >
                  🗓 My Teaching Schedule
                </button>
              </div>
            )}

          <h3 style={{ marginTop: 24 }}>Earning Actions</h3>
          {role === "student" ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                className="action-btn primary"
                onClick={() => {
                  navigate("/dashboard#tutors"); 
                }}
              >
                📅 Attend a Lesson
              </button>

              <button
                className="action-btn secondary"
                onClick={() => setSelectedAction("assignments")}
              >
                📚 Complete Assignments
              </button>

              <button
                className="action-btn secondary"
                onClick={() => setSelectedAction("feedback")}
              >
                Give useful feedback
              </button>

              <button
                className="action-btn secondary"
                onClick={handleDailyLogin}
                disabled={hasLoggedInToday}
                style={{
                  opacity: hasLoggedInToday ? 0.6 : 1,
                  cursor: hasLoggedInToday ? "not-allowed" : "pointer"
                }}
              >
                  {hasLoggedInToday ? "✅ Checked In" : "Check In"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="action-btn primary" onClick={() => setSelectedAction("conduct_session")}>
                Conduct a tutoring session
              </button>
              <button className="action-btn secondary" onClick={() => setSelectedAction("respond_feedback")}>
                View Student Feedback
              </button>
              <button className="action-btn secondary" onClick={() => setSelectedAction("consistency_bonus")}>
                Consistency bonus
              </button>
              <button className="action-btn secondary" onClick={() => setSelectedAction("upload_material")}>
                📤 Upload Materials
              </button>
              <button className="action-btn secondary" onClick={() => setSelectedAction("student_engagement")}>
                Student engagement bonus
              </button>
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
              <button 
                className="action-btn secondary" 
                onClick={() => setSelectedTutor(null)}
              >
                Close
              </button>

              <button
                className="action-btn primary"
                onClick={() => {
                  const raw = localStorage.getItem("auth-user");
                  if (!raw) {
                    alert("Please log in to perform this action.");
                    return;
                  }

                  const user = JSON.parse(raw);

                  setSessions(prev => [
                    ...prev,
                    {
                      id: prev.length + 1,
                      tutor: selectedTutor.name,
                      student: user.fullName,
                      subject: selectedTutor.subject,
                      date: new Date().toISOString().split("T")[0],
                      time: "15:00",
                      type: "live",
                      status: "upcoming"
                    }
                  ]);

                  simulateStudentAction("attend_session");

                  addActivity(`You joined ${selectedTutor.name}'s ${selectedTutor.subject} class`, "session");

                  alert(`You have successfully joined ${selectedTutor.name}'s ${selectedTutor.subject} class! 🎉`);
                  setSelectedTutor(null);
                }}
              >
                💳 Pay & Join Class
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAction === "assignments" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assignments</h3>
              <button className="modal-close" onClick={() => setSelectedAction("")}>✕</button>
            </div>

            <div className="modal-body">
              {assignments.filter(a => !a.completed).length === 0 ? (
                <p>✅ All assignments are completed!</p>
              ) : (
                <ul>
                  {assignments.filter(a => !a.completed).map(a => (
                    <li key={a.id} style={{ marginBottom: 12 }}>
                      <span>{a.title}</span>
                      <button
                        className="action-btn primary"
                        style={{ marginLeft: 12 }}
                        onClick={() => {
                          const raw = localStorage.getItem("auth-user");
                          if (!raw) { alert("Please log in to perform this action."); return; }

                          setAssignments(prev =>
                            prev.map(x => x.id === a.id ? { ...x, completed: true } : x)
                          );

                          simulateStudentAction("complete_assignment");

                          addActivity(`Completed assignment: ${a.title}`, "assignment");

                          alert(`🎉 You completed ${a.title} and earned coins!`);
                        }}
                      >
                        Complete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedAction === "feedback" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Give Feedback</h3>
              <button className="modal-close" onClick={() => setSelectedAction("")}>✕</button>
            </div>

            <div className="modal-body">
              {sessions.filter(s => s.student === currentUser?.fullName).length === 0 ? (
                <p>⚠️ You need to attend a class before giving feedback.</p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const raw = localStorage.getItem("auth-user");
                    if (!raw) { alert("Please log in first."); return; }

                    const formData = new FormData(e.target);
                    const sessionId = formData.get("session");
                    const feedback = formData.get("feedback");

                    setSessions(prev =>
                      prev.map(s =>
                        s.id.toString() === sessionId
                          ? { ...s, feedback }
                          : s
                      )
                    );

                    simulateStudentAction("give_feedback");
                    addActivity("Submitted feedback for a tutor", "feedback");

                    alert("🎉 Feedback submitted successfully! Coins awarded.");
                    setSelectedAction("");
                  }}
                >
                  <label>Select a Tutor:</label>
                  <select name="session" required>
                    {sessions
                      .filter(s => s.student === currentUser?.fullName && !s.feedback)
                      .map(s => (
                        <option key={s.id} value={s.id}>
                          {s.subject} with {s.tutor} ({s.date})
                        </option>
                      ))}
                  </select>

                  <textarea
                    name="feedback"
                    required
                    placeholder="Write your feedback here..."
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      padding: "8px",
                      borderRadius: "8px",
                      marginTop: "12px",
                    }}
                  />

                  <button type="submit" className="action-btn primary" style={{ marginTop: "12px" }}>
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedAction === "respond_feedback" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Feedback</h3>
              <button className="modal-close" onClick={() => setSelectedAction("")}>✕</button>
            </div>

            <div className="modal-body">
              {sessions.filter(s => s.tutor === currentUser?.fullName && s.feedback).length === 0 ? (
                <p>No feedback yet.</p>
              ) : (
                <ul>
                  {sessions
                    .filter(s => s.tutor === currentUser?.fullName && s.feedback)
                    .map(s => (
                      <li key={s.id} style={{ marginBottom: 12 }}>
                        <strong>{s.student}</strong> ({s.subject} on {s.date}):  
                        <p style={{ marginTop: 4, fontStyle: "italic" }}>{s.feedback}</p>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedAction === "upload_material" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Materials</h3>
              <button className="modal-close" onClick={() => setSelectedAction("")}>✕</button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  simulateTutorAction("upload_material");
                  setTutorEarnings(prev => ({ ...prev, upload_material: prev.upload_material + 15 }));

                  addActivity("Uploaded new study material", "upload");

                  alert("📤 Materials uploaded successfully! Coins awarded.");
                  setSelectedAction("");
                }}
              >
                <input
                  type="file"
                  required
                  style={{ marginBottom: "10px" }}
                />
                <button type="submit" className="action-btn primary">Upload</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedAction === "conduct_session" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <LessonPage
              onFinish={(action) => {
                simulateTutorAction(action);
                setTutorEarnings(prev => ({ ...prev, session: prev.session + 20 }));

                addActivity("Conducted a tutoring session", "session");

                alert("🎉 Coins awarded for conducting the session!");
                setSelectedAction("");
              }}
            />
          </div>
        </div>
      )}

      {selectedAction === "view_schedule" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{role === "student" ? "My Schedule" : "Teaching Schedule"}</h3>
              <button className="modal-close" onClick={() => setSelectedAction("")}>✕</button>
            </div>
            <div className="modal-body">
              {sessions.filter(s =>
                role === "student"
                  ? s.student === currentUser?.fullName
                  : s.tutor === currentUser?.fullName
              ).length === 0 ? (
                <p>No sessions scheduled.</p>
              ) : (
                <ul>
                  {sessions
                    .filter(s =>
                      role === "student"
                        ? s.student === currentUser?.fullName
                        : s.tutor === currentUser?.fullName
                    )
                    .map(s => (
                      <li key={s.id} style={{ marginBottom: 8 }}>
                        <strong>{s.subject}</strong> with <em>{role === "student" ? s.tutor : s.student}</em><br />
                        Date: {s.date} | Time: {s.time} | Type: {s.type} | Status: {s.status}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedAction === "view_earnings" && (
        <div className="modal-overlay" onClick={() => setSelectedAction("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>My Earnings</h3>
              <button className="modal-close" onClick={() => setSelectedAction("")}>✕</button>
            </div>
            <div className="modal-body">
              <ul>
                <li>📅 Sessions Conducted: {tutorEarnings.session} coins</li>
                <li>📤 Materials Uploaded: {tutorEarnings.upload_material} coins</li>
                <li>👍 Positive Ratings: {tutorEarnings.positive_rating} coins</li>
                <li>🔥 Consistency Bonus: {tutorEarnings.consistency_bonus} coins</li>
                <li>💬 Student Engagement: {tutorEarnings.engagement} coins</li>
              </ul>
              <p>
                <strong>Total Coins Earned: </strong>
                {Object.values(tutorEarnings).reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="modal-footer">
              <button className="action-btn primary" onClick={() => setSelectedAction("")}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`ai-assistant ${aiOpen ? "open" : "collapsed"}`}>
        {aiOpen ? (
          <div className="ai-container">
            <div className="ai-header">
              <span>AI Assistant 🤖</span>
              <button className="ai-close-btn" onClick={() => setAiOpen(false)}>✕</button>
            </div>
            <div className="ai-messages">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`ai-message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="ai-input-form" onSubmit={handleAiSend}>
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask me..."
                className="ai-input"
              />
              <button type="submit" className="action-btn primary">Send</button>
            </form>
          </div>
        ) : (
          <button className="ai-float-btn" onClick={() => setAiOpen(true)}>🤖</button>
        )}
      </div>
    </div>
  );
}