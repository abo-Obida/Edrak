// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./Dashboard.css";
import Swal from "sweetalert2";
const Dashboard = () => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "نعم، احذفه",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/Students/api/DeleteStudent/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("تم الحذف!", "تم حذف الطالب بنجاح.", "success");
            setStudents((prev) => prev.filter((s) => s._id !== id));
          })
          .catch(() => {
            Swal.fire("خطأ!", "حدث خطأ أثناء الحذف.", "error");
          });
      }
    });
  };
  const handleAddGrade = () => {
    const { subject, exam, score, date } = gradesForm;

    if (!subject || !exam || !score) {
      Swal.fire("خطأ", "يرجى ملء جميع الحقول المطلوبة", "warning");
      return;
    }

    setForm((prevForm) => {
      const prevGrades = prevForm.grades?.[subject] || [];
      return {
        ...prevForm,
        grades: {
          ...prevForm.grades,
          [subject]: [...prevGrades, { exam, score: Number(score), date }],
        },
      };
    });

    setGradesForm({
      subject: "",
      exam: "",
      score: "",
      date: "",
    });

    Swal.fire("تم!", "تمت إضافة العلامة محليًا. لا تنسَ الضغط على حفظ", "info");
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    section: "",
  });
  const [editMode, setEditMode] = useState(false); // هل نحن في تعديل؟
  const [editId, setEditId] = useState(null); // ID الطالب الحالي
  const [filterSection, setFilterSection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null); // الطالب المعروض
  const [showViewModal, setShowViewModal] = useState(false); 
  const [gradesForm, setGradesForm] = useState({
    subject: "",
    exam: "",
    score: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editMode
        ? `http://localhost:8000/Students/api/UpdateStudent/${editId}`
        : "http://localhost:8000/Students/api/add";

      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire(
          editMode ? "تم التعديل!" : "تم الإضافة!",
          editMode ? "تم تعديل بيانات الطالب بنجاح" : "تمت إضافة الطالب بنجاح",
          "success"
        );

        if (editMode) {
          setStudents((prev) =>
            prev.map((s) => (s._id === editId ? data.student : s))
          );
        } else {
          setStudents((prev) => [...prev, data]);
        }

        // Reset form
        setShowModal(false);
        setForm({ name: "", phone: "", section: "" });
        setEditMode(false);
        setEditId(null);
      } else {
        Swal.fire("خطأ", data.message || "فشل العملية", "error");
      }
    } catch (error) {
      Swal.fire("خطأ", "حدث خطأ في الاتصال بالسيرفر", "error");
    }
  };

  const [students, setStudents] = useState([]);
  const totalCount = students.length;
  const scienceCount = students.filter((s) => s.section === "science").length;
  const ninth = students.filter((s) => s.section === "ninth").length;
  const literatureCount = students.filter(
    (s) => s.section === "literature"
  ).length;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/Students/api/getAllUser")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);
  const filteredStudents = students
    .filter((s) =>
      filterSection === "all" ? true : s.section === filterSection
    )
    .filter((s) => s.name?.toLowerCase().includes(searchQuery.toLowerCase()));
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
    <div className="dashboard">
      <h1 className="dashboard__title">لوحة تحكم الطلاب</h1>
      <button className="dashboard__add-btn" onClick={() => setShowModal(true)}>
        <FaUserPlus /> إضافة طالب جديد
      </button>
      <div className="dashboard__search-filter">
        <input
          type="text"
          placeholder="ابحث باسم الطالب..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="dashboard__filter">
          <label htmlFor="sectionFilter">القسم: </label>
          <select
            id="sectionFilter"
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
          >
            <option value="all">الكل</option>
            <option value="science">علمي</option>
            <option value="literature">أدبي</option>
            <option value="ninth">تاسع</option>
          </select>
        </div>
      </div>
      <div className="stats-container">
        <div className="stat-card">
          <h3>عدد الطلاب الكلي</h3>
          <p>{totalCount}</p>
        </div>
        <div className="stat-card">
          <h3>القسم العلمي</h3>
          <p>{scienceCount}</p>
        </div>
        <div className="stat-card">
          <h3>القسم الأدبي</h3>
          <p>{literatureCount}</p>
        </div>
        <div className="stat-card">
          <h3>القسم التاسع</h3>
          <p>{ninth}</p>
        </div>
      </div>

      <table className="dashboard__table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>رقم الهاتف</th>
            <th>القسم</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => {
            if (!student || !student.name || !student._id) return null;

            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{translateSection(student.section)}</td>
                <td>
                  <button
                    className="action-btn view"
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowViewModal(true);
                    }}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => {
                      setEditMode(true);
                      setEditId(student._id);
                      setForm({
                        name: student.name,
                        phone: student.phone,
                        section: student.section,
                        grades: student.grades || {},
                      });

                      setShowModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(student._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>إضافة طالب جديد</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="رقم الهاتف"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <select
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                required
              >
                <option value="">اختر القسم</option>
                <option value="science">علمي</option>
                <option value="literature">أدبي</option>
                <option value="ninth">تاسع</option>
              </select>
              <div className="modal-actions">
                <button type="submit">حفظ</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditMode(false);
                    setEditId(null);
                    setForm({ name: "", phone: "", section: "" });
                  }}
                >
                  إلغاء
                </button>
              </div>
              {editMode && (
                <>
                  <hr />
                  <h3 style={{ marginTop: "1rem" }}>إضافة علامة جديدة</h3>
                  <div className="grade-form">
                    <select
                      value={gradesForm.subject}
                      onChange={(e) =>
                        setGradesForm({
                          ...gradesForm,
                          subject: e.target.value,
                        })
                      }
                    >
                      <option value="">اختر المادة</option>
                      <option value="arabic">اللغة العربية</option>
                      <option value="english">اللغة الإنجليزية</option>
                      <option value="math">الرياضيات</option>
                      <option value="physics">الفيزياء</option>
                      <option value="chemistry">الكيمياء</option>
                      <option value="biology">الأحياء</option>
                      <option value="french">الفرنسية</option>
                      <option value="islamic">الإسلامية</option>
                      <option value="history">التاريخ</option>
                      <option value="geography">الجغرافيا</option>
                      <option value="philosophy">الفلسفة</option>
                    </select>

                    <input
                      type="text"
                      placeholder="اسم الامتحان (مثلاً: نهائي، نصف سنة)"
                      value={gradesForm.exam}
                      onChange={(e) =>
                        setGradesForm({ ...gradesForm, exam: e.target.value })
                      }
                    />

                    <input
                      type="number"
                      placeholder="العلامة"
                      value={gradesForm.score}
                      onChange={(e) =>
                        setGradesForm({ ...gradesForm, score: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      value={gradesForm.date}
                      onChange={(e) =>
                        setGradesForm({ ...gradesForm, date: e.target.value })
                      }
                    />

                    <button type="button" onClick={handleAddGrade}>
                      إضافة العلامة
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
      {showViewModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>علامات الطالب: {selectedStudent.name}</h2>

            {selectedStudent.grades &&
            Object.keys(selectedStudent.grades).length > 0 ? (
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
                  {Object.entries(selectedStudent.grades).map(
                    ([subject, exams]) =>
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
              <p>لا توجد علامات لهذا الطالب.</p>
            )}

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedStudent(null);
                }}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
