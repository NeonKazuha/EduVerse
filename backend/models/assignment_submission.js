import mongoose from 'mongoose';

// Create a Schema for Assignment Submissions
const assignmentSubmissionSchema = new mongoose.Schema({
    StudentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    AssignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    AnswerMaterial: {
        type: [String], 
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Graded'],  
        default: 'Pending',
        required: true
    },
    Date: {
        type: Date,
        default: Date.now, 
        required: true
    },
    Points: {
        type: Number,
        min: 0,
        max: 100,  
        required: true
    }
});

const AssignmentSubmission = mongoose.model('Assignment_submission', assignmentSubmissionSchema);
export { AssignmentSubmission };
