import express from "express"
import { createStudent, DeleteStudent, getAllStudents, getPhone, getStudent, UpdateStudent } from "../Controllers/StudentController.js";

const router = express.Router()

router.get("/getAllUser",getAllStudents);
router.get("/getByPhone/:phone",getPhone);
router.post("/add",createStudent);
router.post("/getStudent/:id",getStudent);
router.delete("/DeleteStudent/:id",DeleteStudent);
router.put("/UpdateStudent/:id",UpdateStudent);
export default router;