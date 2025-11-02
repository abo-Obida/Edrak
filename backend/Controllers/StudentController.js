import Student from "../models/Student.js";
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllStudents = async (req, res) => {
  const studints = await Student.find();
  try {
    res.status(200).json(studints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getStudent = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findById(id);
  try {
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const DeleteStudent = async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndDelete(id);
  try {
    res.status(200).json({ status: "deleted Student" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const UpdateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      status: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getPhone = async (req, res) => {
  try {
    const student = await Student.findOne({ phone: req.params.phone });
    if (!student) {
      return res.status(404).json({ message: "الطالب غير موجود" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
}