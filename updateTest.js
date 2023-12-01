import React, { useState, useEffect } from 'react';

const UpdateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Fetch questions from the backend API
  useEffect(() => {
    fetch('https://yourapi.com/questions')// attach our API link, by giving the endpoint at app.js
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    // attach our API link, by giving the endpoint at app.js
    fetch('https://yourapi.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error response
        console.log('Test submitted successfully:', data);
        setSubmitted(true);
      })
      .catch((error) => console.error('Error submitting test:', error));
  };

  return (
    <div>
      <h2>Update Test</h2>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit}>Submit Test</button>
      )}
      {submitted && <p>Test submitted successfully!</p>}
    </div>
  );
};

export default UpdateTest;
