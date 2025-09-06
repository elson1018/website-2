import { useState, useEffect } from "react";
import "./PerformanceInsights.css";

export default function PerformanceInsights({ sessions, currentUser }) {
  const [insights, setInsights] = useState({ total: 0, feedback: 0 });

  useEffect(() => {
    const tutorSessions = sessions.filter(s => s.tutor === currentUser?.fullName);
    const feedbackCount = tutorSessions.filter(s => s.feedback).length;

    setInsights({
      total: tutorSessions.length,
      feedback: feedbackCount
    });
  }, [sessions, currentUser]);

  return (
    <div className="insights-panel">
      <h3>📊 Student Performance Insights</h3>
      <p>Total Sessions Conducted: {insights.total}</p>
      <p>Feedback Received: {insights.feedback}</p>
      <p>
        {insights.total > 0
          ? `Feedback Rate: ${(insights.feedback / insights.total * 100).toFixed(1)}%`
          : "No data yet"}
      </p>
    </div>
  );
}
