import { useCoins } from "../context/CoinContext.jsx";
import { useEffect, useState } from "react";
import "./RewardsPage.css";

export default function RewardsPage() {
  const { role, setRole, studentCoins, tutorCoins, spendStudentCoins, spendTutorCoins, simulateStudentAction, simulateTutorAction } = useCoins();
  const [lastAction, setLastAction] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("action-history");
      setHistory(raw ? JSON.parse(raw) : []);
    } catch { setHistory([]); }
  }, []);

  const recordAction = (label) => {
    setLastAction(label);
    const entry = { label, role, ts: new Date().toISOString() };
    const next = [entry, ...history].slice(0, 6);
    setHistory(next);
    try { localStorage.setItem("action-history", JSON.stringify(next)); } catch {}
  };

  return (
    <div className="rewards-page">
      <h1>Coin Rewards</h1>

      <div className="rewards-header">
        <span>Viewing as:</span>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
        <div className="spacer balances">
          <span className="balance-pill student">Student: {studentCoins}</span>
          <span className="balance-pill tutor">Tutor: {tutorCoins}</span>
        </div>
      </div>

      <section className="rewards-section">
        <h2>Earning Actions</h2>
        {role === "student" ? (
          <div className="actions-row">
            <button className="btn primary" onClick={() => { simulateStudentAction("attend_session"); recordAction("Attended a tutoring session"); }}>Attend a tutoring session</button>
            <button className="btn" onClick={() => { simulateStudentAction("complete_assignment"); recordAction("Completed an assignment/quiz"); }}>Complete assignment/quiz</button>
            <button className="btn" onClick={() => { simulateStudentAction("give_feedback"); recordAction("Gave useful feedback to tutor"); }}>Give useful feedback</button>
            <button className="btn" onClick={() => { simulateStudentAction("daily_login"); recordAction("Daily login"); }}>Daily login</button>
            <button className="btn" onClick={() => { simulateStudentAction("weekly_streak_completed"); recordAction("Weekly attendance streak completed"); }}>Weekly attendance streak</button>
          </div>
        ) : (
          <div className="actions-row">
            <button className="btn primary" onClick={() => { simulateTutorAction("conduct_session"); recordAction("Conducted a tutoring session"); }}>Conduct a tutoring session</button>
            <button className="btn" onClick={() => { simulateTutorAction("positive_rating"); recordAction("Received a positive rating"); }}>Receive positive rating</button>
            <button className="btn" onClick={() => { simulateTutorAction("consistency_bonus"); recordAction("Consistency bonus achieved"); }}>Consistency bonus</button>
            <button className="btn" onClick={() => { simulateTutorAction("upload_material"); recordAction("Uploaded extra study materials"); }}>Upload extra materials</button>
            <button className="btn" onClick={() => { simulateTutorAction("student_engagement"); recordAction("Student engagement bonus"); }}>Student engagement bonus</button>
          </div>
        )}
      </section>

      {lastAction && (
        <div className="rewards-section">
          <div className="confirm-banner">Action recorded: {lastAction}</div>
        </div>
      )}

      {history.length > 0 && (
        <section className="rewards-section">
          <h2>Recent Reward Actions</h2>
          <ul className="history-list">
            {history.map((h, i) => (
              <li key={i} className="history-item">
                <span className="history-label">{h.label}</span>
                <span className="history-meta">{h.role} • {new Date(h.ts).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rewards-section">
        <h2>How Coins Are Earned</h2>
        <div className="rewards-grid">
          <div className="card">
            <h3>For Students</h3>
            <ul className="rules-list">
              <li>Attend a tutoring session → earn coins.</li>
              <li>Complete assignments/quizzes → earn coins.</li>
              <li>Give useful feedback → small coin bonus.</li>
              <li>Consistent attendance (streaks) → extra coins.</li>
            </ul>
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Coins</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Attend a tutoring session</td><td>10</td></tr>
                <tr><td>Complete assignment/quiz</td><td>15</td></tr>
                <tr><td>Daily login streak (3+ days)</td><td>5 per day</td></tr>
                <tr><td>Give useful feedback to tutor</td><td>5</td></tr>
                <tr><td>Weekly attendance streak</td><td>30</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3>For Tutors</h3>
            <ul className="rules-list">
              <li>Successfully conduct a tutoring session → earn coins.</li>
              <li>Positive student ratings/reviews → bonus coins.</li>
              <li>Consistency (teaching regularly without canceling) → extra coins.</li>
              <li>Preparing extra materials/notes → bonus (optional).</li>
            </ul>
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Coins</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Successfully conduct a tutoring session</td><td>20</td></tr>
                <tr><td>Receive positive rating (4★ or 5★)</td><td>10</td></tr>
                <tr><td>Consistent teaching streak</td><td>30</td></tr>
                <tr><td>Upload extra study material/notes</td><td>15</td></tr>
                <tr><td>Student engagement bonus (80%+ attendance)</td><td>25</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rewards-section">
        <h2>How Coins Can Be Spent</h2>
        <div className="rewards-grid">
          <div className="card">
            <h3>Students</h3>
            <ul className="rules-list">
              <li>50 coins → Small study material (PDF, notes).</li>
              <li>100 coins → 10% discount on next session.</li>
              <li>200 coins → Unlock premium workshop.</li>
              <li>500 coins → Gift voucher / special badge.</li>
            </ul>
            <div className="redeem-actions">
              <button className="btn" onClick={() => spendStudentCoins(50)} disabled={studentCoins < 50}>Redeem 50</button>
              <button className="btn" onClick={() => spendStudentCoins(100)} disabled={studentCoins < 100}>Redeem 100</button>
              <button className="btn" onClick={() => spendStudentCoins(200)} disabled={studentCoins < 200}>Redeem 200</button>
              <button className="btn" onClick={() => spendStudentCoins(500)} disabled={studentCoins < 500}>Redeem 500</button>
            </div>
          </div>
          <div className="card">
            <h3>Tutors</h3>
            <ul className="rules-list">
              <li>100 coins → Highlighted tutor profile (1 week).</li>
              <li>200 coins → Access advanced teaching tools.</li>
              <li>500 coins → Gift card or small payout (if allowed).</li>
              <li>1000 coins → Top Tutor badge & profile boost.</li>
            </ul>
            <div className="redeem-actions">
              <button className="btn" onClick={() => spendTutorCoins(100)} disabled={tutorCoins < 100}>Redeem 100</button>
              <button className="btn" onClick={() => spendTutorCoins(200)} disabled={tutorCoins < 200}>Redeem 200</button>
              <button className="btn" onClick={() => spendTutorCoins(500)} disabled={tutorCoins < 500}>Redeem 500</button>
              <button className="btn" onClick={() => spendTutorCoins(1000)} disabled={tutorCoins < 1000}>Redeem 1000</button>
            </div>
          </div>
        </div>
      </section>

      <section className="rewards-section">
        <p className="note">Note: This is a demo UI. Hook to real events as needed.</p>
      </section>
    </div>
  );
}


