import React, { useState } from 'react';

const questions = [
  { q: "2 uur en 45 minuten + 1 uur en 30 minuten = ... minuten", a: "255" },
  { q: "5 uur - 90 minuten = ... uur", a: "3,5" },
  { q: "180 minuten = ... uur", a: "3" },
  // Voeg hier meer vragen toe indien nodig
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const checkAnswer = () => {
    const currentAnswer = questions[currentQuestion].a;
    if (userAnswer.toLowerCase().trim() === currentAnswer.toLowerCase()) {
      setFeedback('Goed!');
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setFeedback(`Fout. Het juiste antwoord is: ${currentAnswer}`);
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setFeedback('');
      } else {
        setIsCompleted(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setFeedback('');
    setCorrectAnswers(0);
    setIsCompleted(false);
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: 'rgb(76, 144, 227)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'normal',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const progressPercentage = (correctAnswers / questions.length) * 100;

  return (
    <div style={{ maxWidth: '600px', margin: '32px auto', padding: '16px', position: 'relative', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <img src="/images/mijnleerlijn-logo.png" alt="Mijnleerlijn Logo" style={{ width: '128px', height: 'auto' }}/>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>www.mijnleerlijn.nl</span>
      </div>
      <div 
        style={{
          height: '4px',
          background: 'linear-gradient(to right, #4299E1, #4FD1C5, #68D391, #F6E05E, #F6AD55, #FC8181)',
          marginBottom: '32px'
        }}
      ></div>
      <h1 style={{ fontSize: '33px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px' }}>Ik kan rekenen met tijd in uren en minuten</h1>
      {!isCompleted ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <button 
              onClick={restartQuiz} 
              style={buttonStyle}
            >
              Opnieuw starten
            </button>
          </div>
          <div style={{ fontSize: '21px', fontWeight: 'bold', textAlign: 'center', color: 'rgb(76, 144, 227)', marginBottom: '24px' }}>{questions[currentQuestion].q}</div>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Jouw antwoord"
            style={{ width: '100%', marginBottom: '24px', fontSize: '20px', padding: '16px', border: '2px solid #d1d5db', borderRadius: '4px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={checkAnswer} 
              style={buttonStyle}
            >
              Controleer
            </button>
          </div>
          {feedback && (
            <div style={{ marginTop: '24px', padding: '16px', fontSize: '20px', display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
              {feedback}
              {feedback === 'Goed!' && (
                <span style={{ marginLeft: '8px', fontSize: '24px' }}>🏁</span>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
          <p style={{ fontSize: '24px', marginBottom: '16px' }}>
            Goed gedaan! Je hebt alle vragen beantwoord.
          </p>
          <p style={{ fontSize: '20px' }}>
            Je hebt {correctAnswers} van de {questions.length} vragen goed beantwoord.
          </p>
          <button 
            onClick={restartQuiz} 
            style={{ ...buttonStyle, marginTop: '24px' }}
          >
            Opnieuw beginnen
          </button>
        </div>
      )}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '16px', 
        right: '16px', 
        height: '40px', 
        backgroundColor: '#e5e7eb', 
        borderRadius: '20px', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          width: `${progressPercentage}%`, 
          height: '100%', 
          backgroundColor: 'rgb(76, 144, 227)', 
          transition: 'width 0.5s ease-in-out' 
        }}></div>
        <span style={{ 
          position: 'absolute', 
          right: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          fontSize: '30px' 
        }}>
          🏁
        </span>
      </div>
    </div>
  );
}

export default App;