import express from 'express';
import userRouter from './user.js';
import accountRouter from './account.js';
import studentRouter from "./student.js"
import teacherRouter from "./teacher.js"
import assignmentRouter from "./assignment.js"
import assignmentSubmissionRouter from "./assignment_submission.js"
import attendanceRouter from "./attendance.js"
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/student",studentRouter);
router.use("/teacher",teacherRouter);
router.use("/assignment",assignmentRouter);
router.use("/submission",assignmentSubmissionRouter);
router.use("/attendance", attendanceRouter);

export default router;
