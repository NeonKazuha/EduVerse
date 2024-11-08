// backend/routes/account.js
import express from 'express';
import { Assignment } from '../models/assignment.js';
import { Teacher } from '../models/teacher.js';


const router = express.Router();
router.post('/upload', async (req, res) => {
    try {
        const { teacherId, questionMaterials, description, deadline } = req.body;

        // Validate required fields
        if (!teacherId ||  !description || !deadline) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new Assignment document
        const newAssignment = new Assignment({
            TeacherId: teacherId,
            Question_material: questionMaterials,
            Description: description,
            Deadline: new Date(deadline)
        });

        // Save the new assignment to the database
        const savedAssignment = await newAssignment.save();

        // Find the teacher and update their assignments list
        const teacher = await Teacher.findOne({TeacherId:teacherId});
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }

        teacher.Assignments.push(savedAssignment._id);
        await teacher.save();

        // Return the created assignment
        res.status(201).json({ message: 'Assignment created successfully.', assignment: savedAssignment });
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;