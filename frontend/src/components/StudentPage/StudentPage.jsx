// StudentView.jsx
import React, { useState } from "react";
import "./StudentPage.css";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const StudentView = () => {
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!phone) {
      Swal.fire("تنبيه", "يرجى إدخال رقم الهاتف", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/Students/api/getByPhone/${phone}`
      );
      const data = await res.json();

      if (res.ok) {
        setStudent(data);
      } else {
        setStudent(null);
        Swal.fire("خطأ", data.message || "الطالب غير موجود", "error");
      }
    } catch (error) {
      Swal.fire("خطأ", "فشل الاتصال بالسيرفر", "error");
    }
    setLoading(false);
  };
  const translateSection = (section) => {
    switch (section) {
      case "science":
        return "علمي";
      case "literature":
        return "أدبي";
      case "ninth":
        return "تاسع";
      default:
        return section;
    }
  };
  return (
    <div className="student-view">
      <h1 className="title">عرض العلامات</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="أدخل رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSearch}>عرض علاماتي</button>
      </div>

      {loading &&<Loader/>}

      {student && (
        <div className="result-box">
          <h2>{student.name}</h2>
          <p>{translateSection(student.section)}</p>

          {student.grades && Object.keys(student.grades).length > 0 ? (
            <table className="grades-table">
              <thead>
                <tr>
                  <th>المادة</th>
                  <th>الامتحان</th>
                  <th>العلامة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(student.grades).map(([subject, exams]) =>
                  exams.map((exam, idx) => (
                    <tr key={`${subject}-${idx}`}>
                      <td>{subject}</td>
                      <td>{exam.exam}</td>
                      <td>{exam.score}</td>
                      <td>{exam.date ? exam.date.slice(0, 10) : "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p>لا توجد علامات حالياً.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentView;
