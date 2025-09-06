import { useState } from "react";

export default function LessonPage({ onFinish }) {
  const [lessonType, setLessonType] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="lesson-page" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Conduct a Tutoring Lesson</h2>

      {!lessonType && (
        <div style={{ marginTop: "20px" }}>
          <button
            className="action-btn primary"
            onClick={() => setLessonType("prerecorded")}
          >
            Upload Pre-recorded Lesson 🎥
          </button>
          <button
            className="action-btn secondary"
            onClick={() => setLessonType("live")}
            style={{ marginLeft: "12px" }}
          >
            Start Live Session 📡
          </button>
        </div>
      )}

      {lessonType === "prerecorded" && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setUploadedFile(e.target.files[0])}
          />
          {uploadedFile && <p>Uploaded: {uploadedFile.name}</p>}
          <button
            className="action-btn primary"
            onClick={() => {
              alert("✅ Pre-recorded lesson uploaded. Coins awarded!");
              onFinish("conduct_session");
            }}
            style={{ marginTop: "12px" }}
          >
            Submit Lesson
          </button>
        </div>
      )}

      {lessonType === "live" && (
        <div style={{ marginTop: "20px" }}>
          <p>Starting a live session... (simulate Zoom/Meet here)</p>
          <button
            className="action-btn primary"
            onClick={() => {
              alert("🟢 Live session started!");
            }}
          >
            Start Live
          </button>
          <button
            className="action-btn secondary"
            onClick={() => {
              alert("✅ Live session ended. Coins awarded!");
              onFinish("conduct_session");
            }}
            style={{ marginLeft: "12px" }}
          >
            End Session
          </button>
        </div>
      )}
    </div>
  );
}
