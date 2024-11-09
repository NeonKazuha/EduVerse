import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { charactersAtom, socket } from '../Socketmanager';

const GradeAssignment = () => {
  const [characters, setCharacters] = useAtom(charactersAtom);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grade, setGrade] = useState('');

  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setSelectedStudent(null);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleGradeSubmit = () => {
    if (!selectedStudent || !selectedAssignment) return;

    // Emit the gradeAssignment event
    socket.emit('gradeAssignment', {
      studentId: selectedStudent.id,
      assignmentTitle: selectedAssignment.title,
      grade,
    });

    // Update the local state to reflect the new grade
    setCharacters((prevCharacters) =>
      prevCharacters.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              assignments: student.assignments.map((assignment) =>
                assignment.title === selectedAssignment.title
                  ? { ...assignment, grade }
                  : assignment
              ),
            }
          : student
      )
    );

    setGrade('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 pt-4 text-center">Grade Assignments</h2>
      {!selectedAssignment ? (
        <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
          {characters[0]?.assignments.map((assignment) => (
            <li key={assignment.title} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
              <button
                onClick={() => handleSelectAssignment(assignment)}
                className="mx-1 text-[20px] px-4 py-2 bg-indigo-500 text-white rounded-md border-none shadow-lg"
              >
                {assignment.title}
              </button>
              <span className="text-md text-gray-400 ml-32">{assignment.dueDate}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button onClick={() => setSelectedAssignment(null)} className="mx-1 text-[18px] px-4 py-2 bg-indigo-500 text-white rounded-md border-none shadow-lg mb-4">
            Back to Assignments
          </button>
          <h3 className="text-xl font-semibold mb-2">{selectedAssignment.title}</h3>
          <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
            {characters.map((student) => (
              <li key={student.id} className="py-2 px-4 flex justify-between items-center hover:bg-gray-100">
                <span className="text-sm">{student.id}</span>
                <span className="text-sm">{student.assignments.find(a => a.title === selectedAssignment.title)?.status || 'Not Submitted'}</span>
                <span className="text-sm">
                  {student.assignments.find(a => a.title === selectedAssignment.title)?.grade || 'N/A'}
                </span>
                <button
                  onClick={() => handleSelectStudent(student)}
                  className="mx-1 text-[18px] px-4 py-2 bg-indigo-500 text-white rounded-md border-none shadow-lg"
                >
                  {student.assignments.find(a => a.title === selectedAssignment.title)?.status === 'done' ? 'View Submission' : 'Grade'}
                </button>
              </li>
            ))}
          </ul>
          {selectedStudent && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Submission by {selectedStudent.id}</h4>
              <a
                href={selectedStudent.assignments.find(a => a.title === selectedAssignment.title)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Work
              </a>
              <div className="mt-2">
                <input
                  type="text"
                  value={grade}
                  onChange={handleGradeChange}
                  placeholder="Enter grade"
                  className="border p-1"
                />
                <button onClick={handleGradeSubmit} className="mx-1 text-[18px] px-4 py-2 bg-indigo-500 text-white rounded-md border-none shadow-lg">
                  Submit Grade
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GradeAssignment;