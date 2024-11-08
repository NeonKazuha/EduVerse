import mongoose from 'mongoose';

// Create a Schema for Assignments
const assignmentSchema = new mongoose.Schema({
    TeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    Question_material: {
        type: [String],  
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Deadline: {
        type: Date,
        required: true
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export { Assignment };
