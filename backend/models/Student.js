import mongoose from "mongoose"

const examSchema = new mongoose.Schema({
  exam: String,
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  date: Date
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    enum: ["science", "literature", "ninth"],
    required: true,
  },
  grades: {
    arabic: [examSchema],
    english: [examSchema],
    french: [examSchema],
    islamic: [examSchema],
    math: [examSchema],
    physics: [examSchema],
    chemistry: [examSchema],
    biology: [examSchema],
    history: [examSchema],
    geography: [examSchema],
    philosophy: [examSchema]
  }
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
