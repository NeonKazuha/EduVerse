import express from 'express';
import { AssignmentSubmission } from '../models/assignment_submission.js';
// Adjust the path based on your project structure

const router = express.Router();

// POST route to create a new Assignment Submission
router.post('/', async (req, res) => {
    try {
        
        const { studentId, answerMaterial, assignmentId, status, points } = req.body;

        // Validate required fields
        if (!studentId || !assignmentId) {
            return res.status(400).json({ message: 'Student ID and Assignment ID are required.' });
        }

        // Create a new Assignment Submission document
        const newSubmission = new AssignmentSubmission({
            StudentId:studentId,
            AnswerMaterial: answerMaterial || [],
            AssignmentId:assignmentId,
            status: status || 'Submitted',
            Points: points || 0,
            Date: new Date()
        });

        // Save the new submission to the database
        const savedSubmission = await newSubmission.save();

        // Return the created submission
        res.status(201).json({ message: 'Assignment submitted successfully.', submission: savedSubmission });
    } catch (error) {
        console.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET route to retrieve assignment submissions by assignmentId
router.get('/assignment/:assignmentId', async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Find all submissions for the specified assignment ID
        const submissions = await AssignmentSubmission.find({ AssignmentId: assignmentId });
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this assignment.' });
        }

        // Return the found submissions
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// GET route to retrieve assignment submissions by assignmentId
router.get('/assignment/:assignmentId/status/:status', async (req, res) => {
    try {
        const { assignmentId,status } = req.params;

        // Find all submissions for the specified assignment ID
        const submissions = await AssignmentSubmission.find({ AssignmentId: assignmentId ,status:status});
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this assignment.' });
        }

        // Return the found submissions
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// GET route to retrieve assignment submissions by studentId
router.get('/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find all submissions for the specified assignment ID
        const submissions = await AssignmentSubmission.find({ StudentId: studentId });
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this assignment.' });
        }

        // Return the found submissions
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// PUT route to update an Assignment Submission
router.put('/:submissionId', async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { answerMaterial, status, points } = req.body;

        // Find the assignment submission by its ID
        const submission = await AssignmentSubmission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found.' });
        }

        // Update the fields that are provided
        if (answerMaterial) {
            submission.AnswerMaterial = answerMaterial;
        }
        if (status) {
            submission.status = status;
        }
        if (points !== undefined) { // Check for points being provided
            submission.Points = points;
        }

        // Save the updated submission
        const updatedSubmission = await submission.save();

        // Return the updated submission
        res.status(200).json({ message: 'Submission updated successfully.', submission: updatedSubmission });
    } catch (error) {
        console.error('Error updating submission:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
