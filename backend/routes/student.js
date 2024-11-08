import { Student } from '../models/studentModel.js';

import express from "express"

const router = express.Router();

// POST route to create a new Student
router.post('/', async (req, res) => {
    try {
        const { studentId, assignmentIds } = req.body;

        // Validate required fields
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required.' });
        }

        // Create a new Student document
        const newStudent = new Student({
            studentId: studentId,
            Assignments: assignmentIds || []
        });

        // Save the new student to the database
        const savedStudent = await newStudent.save();

        // Return the created student
        res.status(201).json({ message: 'Student created successfully.', student: savedStudent });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET route to retrieve a Student by studentId
router.get('/single/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by their ID
        const student = await Student.findOne({ studentId }).populate("studentId");
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Return the found student
        res.status(200).json(student);
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET route to retrieve all Students
// Define the /getall route first
router.get('/getall', async (req, res) => {
    try {
        // Find all students
        //console.log("Fetching all students");
        const students = await Student.find({}).populate("studentId");

        // Return the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// PUT route to add an assignment ID to multiple students
router.put('/add/assignments', async (req, res) => {
    try {
        const { studentIds, assignmentId } = req.body;

        // Validate required fields
        if (!Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ message: 'Student IDs must be a non-empty array.' });
        }
        if (!assignmentId) {
            return res.status(400).json({ message: 'Assignment ID is required.' });
        }

        // Use updateMany to add the assignment ID to all specified student IDs
        const result = await Student.updateMany(
            { studentId: { $in: studentIds } }, // Match students with the specified IDs
            { $addToSet: { Assignments: assignmentId } } // Add assignmentId to the Assignments array
        );

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'No students were updated. Check the student IDs.' });
        }

        // Return success message
        res.status(200).json({ message: 'Assignments added successfully.', modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error('Error adding assignments to students:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
