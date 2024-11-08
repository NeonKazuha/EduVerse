import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    Assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment', 
        required: true
    }]
  
});

const Student = mongoose.model('Student', studentSchema);
export {Student};
