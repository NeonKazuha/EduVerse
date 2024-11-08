// backend/routes/account.js
import express from 'express';
import { Attendance } from '../models/attendance';
// POST route to note the attendance
router.post('/', async (req, res) => {
    try {
        const { date, teacherId, studentIds } = req.body;

        const attendance = new Attendance({
            date,
            teacherId,
            studentIds
        });

        await attendance.save();
        res.status(201).json({ message: 'Attendance noted successfully', attendance });
    } catch (error) {
        res.status(500).json({ error: 'Error noting attendance', details: error.message });
    }
});

// GET route to fetch attendance by teacherId
router.get('/teacher/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;

        const attendanceRecords = await Attendance.find({ teacherId });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found for this teacher' });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance records', details: error.message });
    }
});

router.get('/date/:teacherId/:date', async (req, res) => {
    try {
        const { date, teacherId } = req.params;

        const attendanceRecord = await Attendance.findOne({ date, teacherId });

        if (!attendanceRecord) {
            return res.status(404).json({ message: 'No attendance record found for this date and teacher' });
        }

        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance record', details: error.message });
    }
});

router.get('/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        // Count the number of attendance records where the studentId is present
        const attendanceCount = await Attendance.countDocuments({ studentIds: studentId });

        res.status(200).json({ studentId, daysPresent: attendanceCount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance records', details: error.message });
    }
});


const router = express.Router();


export default router;