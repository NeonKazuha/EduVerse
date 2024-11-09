import React, { useEffect, useState } from 'react';
import { socket } from '../Socketmanager';
import { Findme } from '../Utils/Findme';
import { useAtom } from 'jotai';

const AskQuestionAlert = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
const [me,setme] = useAtom(Findme)
  useEffect(() => {
    socket.on('receiveQuestion', (data) => {
      setQuestionData(data);
      setSelectedAnswer(null); // Reset selected answer when new question arrives
    });

    return () => {
      socket.off('receiveQuestion');
    };
  }, []);

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      socket.emit('submitAnswer', {
        questionId: questionData.id, // Assuming each question has a unique ID
        answer: selectedAnswer
      });
      setQuestionData(null); // Clear the question after submitting
    }
  };

  if (!questionData) return null;

  return (<>{ me.role =='student' && <div className=" top-4 absolute z-50 right-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 ">
    <h4 className="text-lg font-semibold mb-3">{questionData.question}</h4>
    <ul className="space-y-2 mb-4">
      {questionData.options.map((option, index) => (
        <li key={index}>
          <button
            className={`w-full text-left p-2 rounded ${selectedAnswer === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedAnswer(index)}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-2 rounded ${selectedAnswer !== null
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      onClick={handleAnswerSubmit}
      disabled={selectedAnswer === null}
    >
      Submit Answer
    </button>
  </div>
  }
  
  </>
  
  );
};

export default AskQuestionAlert;