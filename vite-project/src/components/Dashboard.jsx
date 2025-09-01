import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    tasks: 0,
    completed: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        </div>
      </div>
    </div>
  );
}
