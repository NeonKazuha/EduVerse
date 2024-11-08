import mongoose from 'mongoose';

// Create a Schema for Teachers
const teacherSchema = new mongoose.Schema({
    TeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    materialUrl: [{
        type: String,
       
    }],
    Assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',  
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export { Teacher };
