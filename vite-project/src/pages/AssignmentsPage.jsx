export default function AssignmentsPage() {
  const assignments = [
    { id: 1, title: "Algebra Practice Set", subject: "Mathematics", status: "Incomplete" },
    { id: 2, title: "Newton's Laws Quiz", subject: "Physics", status: "Incomplete" },
    { id: 3, title: "Organic Chemistry Worksheet", subject: "Chemistry", status: "Incomplete" },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Uncompleted Assignments/Quizzes</h1>
      <p style={{ color: "#64748b" }}>Pick one to complete and earn coins.</p>
      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {assignments.map(a => (
          <div key={a.id} style={{ padding: 16, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{a.title}</div>
                <div style={{ color: "#64748b", fontSize: 14 }}>{a.subject} • {a.status}</div>
              </div>
              <button className="btn">Start</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


