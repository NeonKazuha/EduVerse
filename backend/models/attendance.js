import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentIds: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

// Create the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

export { Attendance };
