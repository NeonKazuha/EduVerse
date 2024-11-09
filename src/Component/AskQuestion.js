import React, { useState, useEffect } from 'react';
import { socket } from '../Socketmanager';

const AskQuestion = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        socket.on('updateAnswers', (data) => {
            console.log(data);
            setAnswers(data.answerArray);
        });

        return () => {
            socket.off('updateAnswers');
        };
    }, []);

    const handleQuestionChange = (e) => setQuestion(e.target.value);
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAskQuestion = () => {
        setLoad(true);
        setStatus("Sending...");
        socket.emit('askQuestion', { question, options });
        setStatus("Sent");
        setLoad(false);
    };

    return (
        <div className="shadow p-4 py-8">
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Ask a Question</div>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border bg-white border-gray-300 p-4 shadow-lg max-w-2xl">
                <input
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    spellCheck="false"
                    onChange={handleQuestionChange}
                    value={question}
                    placeholder="Enter your question"
                    type="text"
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        className="option bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                        spellCheck="false"
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        value={option}
                        placeholder={`Option ${index + 1}`}
                        type="text"
                    />
                ))}
                <div className="buttons flex justify-end">
                    {load && <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">{status}</div>}
                    <div onClick={handleAskQuestion} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">ASK</div>
                </div>
            </div>
            <div className="answers mt-4">
                <h3 className="font-bold text-lg">Student Answers:</h3>
                <ul className="divide-y divide-gray-200 bg-white/60 shadow rounded-lg">
                    {answers.map((answer, index) => (
                        <li key={index} className="py-3 px-4 flex justify-between items-center">
                            <span className="font-medium text-gray-700">{answer.studentId}</span>
                            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                {answer.answer}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AskQuestion;