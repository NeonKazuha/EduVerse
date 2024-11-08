// backend/routes/account.js
import express from 'express';

import { Teacher } from '../models/teacher.js';

const router = express.Router();


// POST route to create a new Teacher
router.post('/', async (req, res) => {
    try {
        const { userId, materialUrls, assignmentIds } = req.body;

        // Validate required fields
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Create a new Teacher document
        const newTeacher = new Teacher({
            TeacherId: userId,
            materialUrl: materialUrls || [],
            Assignments: assignmentIds || []
        });

        // Save the new teacher to the database
        const savedTeacher = await newTeacher.save();

        // Return the created teacher
        res.status(201).json({ message: 'Teacher created successfully.', teacher: savedTeacher });
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// GET route to retrieve a Teacher by TeacherId
router.get('/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;
       
        // Find the teacher by their ID and populate the references
        const teacher = await Teacher.find({TeacherId:teacherId})
            .populate('TeacherId')  // Populate the TeacherId with User details
            .populate('Assignments');  // Populate the Assignments with Assignment details

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }

        // Return the found teacher
        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error retrieving teacher:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// PUT route to add new material URLs to a Teacher
router.put('/:teacherId/materials', async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { materialUrls } = req.body;

        // Validate required fields
        if (!Array.isArray(materialUrls)) {
            return res.status(400).json({ message: 'Material URLs must be an array.' });
        }

        // Find the teacher by their ID
        const teacher = await Teacher.findOne({ TeacherId: teacherId });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        //console.log(teacher);
        // Combine existing material URLs with the new ones, ensuring no duplicates
        const addMaterialUrls = (existingUrls, newUrls) => {
            const combinedUrls = new Set([...(existingUrls || []), ...newUrls]);
            return Array.from(combinedUrls);
        };

        // Usage
        teacher.materialUrl = addMaterialUrls(teacher.materialUrl, materialUrls);

        //console.log(teacher)
        // Save the updated teacher document
        const updatedTeacher = await teacher.save();

        // Return the updated teacher
        res.status(200).json({ message: 'Material URLs added successfully.', teacher: updatedTeacher });
    } catch (error) {
        console.error('Error adding material URLs:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
export default router;
