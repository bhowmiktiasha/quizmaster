import { useState, useEffect } from "react";
import "./index.css";
import LoadMe from "./LoadMe";

const App = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);

  const [userAnswers, setUserAnswers] = useState({}); // Store user answers
  const [quizFinished, setQuizFinished] = useState(false); // Track if quiz is finished
  const [score, setScore] = useState(0);

  const [incorrectAnswers, setIncorrect] = useState(0); // Track incorrect answers
  const [unansweredQuestions, setUnanswered] = useState(0); // Track unanswered questions
  const [scorePercentage, setScorePercentage] = useState(0); // Track score
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  });


  const isButtonDisabled = !name || !topic;

  const questions = {
    Javascript: [
      {
        id: "q1",
        question:
          "Which method can be used to round a number to the nearest integer in JavaScript?",
        options: [
          "A. This method rounds a number up to the nearest integer, regardless of its decimal part.",
          "B. This method rounds a number down to the nearest integer, ignoring the decimal part.",
          "C. This method rounds a number to the nearest integer based on its decimal value.",
          "D. This method generates a random number between 0 and 1, without rounding.",
        ],
        correctAnswer: "C",
      },
      {
        id: "q2",
        question: "What is the correct syntax for a function in JavaScript?",
        options: [
          "A. function myFunction() { }",
          "B. function:myFunction() { }",
          "C. func myFunction() { }",
          "D. myFunction function() { }",
        ],
        correctAnswer: "C",
      },
      {
        id: "q3",
        question:
          "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
          "A. <script name='script.js'>",
          "B. <script href='script.js'>",
          "C. <script src='script.js'>",
          "D. <script file='script.js'>",
        ],
        correctAnswer: "C",
      },
      {
        id: "q4",
        question: "Which company developed JavaScript?",
        options: ["A. Microsoft", "B. Netscape", "C. Google", "D. Mozilla"],
        correctAnswer: "B",
      },
    ],
    "React.js": [
      {
        id: "q1",
        question: "What is the main purpose of React?",
        options: [
          "A. To build mobile apps",
          "B. To create single-page applications with a responsive user interface",
          "C. To manage backend databases",
          "D. To provide a set of predefined UI components",
        ],
        correctAnswer: "B",
      },
      {
        id: "q2",
        question: "Which of the following is true about React components?",
        options: [
          "A. Components cannot be reused",
          "B. Components are functions or classes that return a UI",
          "C. Components are written in CSS",
          "D. Components can only be defined in the App.js file",
        ],
        correctAnswer: "B",
      },

      {
        id: "q3",
        question: "What is JSX in React?",
        options: [
          "A. A JavaScript function",
          "B. A syntax extension for JavaScript that looks similar to HTML",
          "C. A type of React component",
          "D. A JavaScript library for animation",
        ],
        correctAnswer: "B",
      },
      {
        id: "q4",
        question: "What is the purpose of useState hook in React?",
        options: [
          "A. To manage side effects in components",
          "B. To store a mutable value that persists across re-renders",
          "C.To handle component lifecycle methods",
          "D. To define prop types for components",
        ],
        correctAnswer: "B",
      },
    ],
    GenAi: [
      {
        id: "q1",
        question: "What is the main purpose of General AI?",
        options: [
          "A. To simulate human intelligence in machines",
          "B. To enhance machine learning algorithms",
          "C. To make machines learn from data",
          "D. To automate repetitive tasks",
        ],
        correctAnswer: "A",
      },
      {
        id: "q2",
        question: "Which of the following is a feature of General AI?",
        options: [
          "A. Narrow domain-specific problem solving",
          "B. Ability to perform tasks beyond human capabilities",
          "C. Adaptation to any intellectual task a human can do",
          "D. Inability to learn from data",
        ],
        correctAnswer: "C",
      },
      {
        id: "q3",
        question: "Which technology is used in the development of General AI?",
        options: [
          "A. Deep Learning",
          "B. Reinforcement Learning",
          "C. Natural Language Processing (NLP)",
          "D. All of the above",
        ],
        correctAnswer: "D",
      },
      {
        id: "q4",
        question: "What differentiates General AI from Narrow AI?",
        options: [
          "A. General AI can learn from experience, while Narrow AI is designed for specific tasks",
          "B. General AI focuses on specific problem-solving, while Narrow AI learns from experience",
          "C. There is no difference",
          "D. General AI can only be used for specific tasks",
        ],
        correctAnswer: "A",
      },
    ],
    NextJS: [
      {
        id: "q1",
        question:
          "What is the primary use of the 'getServerSideProps' function in Next.js?",
        options: [
          "A. Fetch data at build time",
          "B. Fetch data at request time",
          "C. Fetch data from client-side",
          "D. Fetch data from APIs only",
        ],
        correctAnswer: "B",
      },
      {
        id: "q2",
        question: "Which Next.js feature helps in optimizing image loading?",
        options: [
          "A. next/image",
          "B. next/optimize",
          "C. next/lazyload",
          "D. next/prefetch",
        ],
        correctAnswer: "A",
      },
      {
        id: "q3",
        question:
          "What is the primary purpose of a _document.js file in Next.js?",
        options: [
          "A. To customize the HTML structure for the entire app",
          "B. To customize global styles",
          "C. To handle server-side rendering",
          "D. To manage environment variables",
        ],
        correctAnswer: "A",
      },
      {
        id: "q4",
        question: "How can you create dynamic routes in Next.js?",
        options: [
          "A. Using getInitialProps",
          "B. Using folder and file names with brackets []",
          "C. Using next/router API",
          "D. Using custom server configuration",
        ],
        correctAnswer: "B",
      },
    ],
  };

  useEffect(() => {
    if (isQuizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [isQuizStarted, timeLeft]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleStart = () => {
    setIsQuizStarted(true);
    setCurrentQuestion(0); // Reset to the first question when starting the quiz
    setTimeLeft(10);
  };

  const handleFinish = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredQuestions = 0;

    questions[topic].forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer) {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      } else {
        unansweredQuestions++;
      }
    });

    const totalQuestions = questions[topic].length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    setScore(correctAnswers);
    setIncorrect(incorrectAnswers);
    setUnanswered(unansweredQuestions);
    setScorePercentage(percentage);
    setQuizFinished(true);
  };

  const handleNext = () => {
    const totalQuestions = questions[topic].length;
    if (selectedAnswer) {
      handleAnswerChange(questions[topic][currentQuestion].id, selectedAnswer);
    }
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer
      setTimeLeft(10); // Reset the timer for the next question
    } else {
      handleFinish(); // Automatically finish quiz if it's the last question
    }
  };

  const performanceFeedback = () => {
    const totalQuestions = Object.values(questions).flat().length;

    if (score === totalQuestions) {
      return "Great job!";
    } else if (score > totalQuestions / 2) {
      return "Good work!";
    } else {
      return "Keep Practicing!";
    }
  };

  const skipQuestion = () => {
    handleNext(); // Skip to the next question
  };

  const handleExitQuiz = () => {
    setIsQuizStarted(false); // Reset quiz state
    setQuizFinished(false); // Reset finished state
    setCurrentQuestion(0); // Go back to the first question
    setTimeLeft(10); // Reset the timer
    setUserAnswers({}); // Clear answers
    setScore(0); // Reset score
    setTopic(""); // Reset topic selection
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
  <>
    {isLoading ? (
      <LoadMe/>
    ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      {!isQuizStarted ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-white">
            Welcome to{" "}
            <span style={{ color: "#b33b72", fontWeight: "bold" }}>
              QUIZZy
            </span>
          </h1>
          <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
            <div className="mb-4">
              <p className="text-gray-700">
                Please read all the rules about this quiz before you start.
              </p>
              <a
                href="#"
                className="text-pink-600 hover:underline"
                onClick={() => setIsModalOpen(true)}
              >
                Quiz rules
              </a>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Please select a topic to continue
              </label>
              <div className="flex flex-wrap sm:flex-row flex-col space-x-4 sm:space-x-4 sm:space-y-0 space-y-6">
                {Object.keys(questions).map((t) => (
                  <div key={t} className="w-full sm:w-auto">
                    <input
                      type="radio"
                      id={t}
                      name="topic"
                      value={t}
                      checked={topic === t}
                      onChange={() => setTopic(t)}
                      className="hidden"
                    />
                    <label
                      htmlFor={t}
                      className={`px-4 py-2 border rounded cursor-pointer ${
                        topic === t
                          ? "bg-pink-600 text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      } hover:bg-pink-100`}
                    >
                      {t}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={isButtonDisabled}
              className={`w-fit py-2 px-4 rounded text-white font-bold ${
                isButtonDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              Start Quiz
            </button>
          </div>
        </>
      ) : quizFinished ? (
        <div className="w-full max-w-xl bg-white px-6 py-12 rounded-lg bg-slate-100 shadow-lg">
          <h1 className="text-lg font-bold mb-4 text-center text-gray-700">
            You have successfully completed the quiz
          </h1>
          <div className="text-4xl justify-center text-center font-bold text-pink-500 mb-4">
            {performanceFeedback()}
          </div>
          <h2 className="text-xl text-center font-bold mb-4 text-gray-700">
            Your Score -{" "}
            <span className="text-green-700">
              {scorePercentage.toFixed(2)}%
            </span>
          </h2>
          <div className="border-2 rounded-lg mt-10 p-4 w-full justify-center">
            <h2 className="text-xl mt-4 text-center font-bold mb-4 text-gray-700">
              Out of 10 Questions
            </h2>
            <div className="flex text-center justify-center">
              <div className="text-lg font-bold text-gray-700 mb-4">
                <span className="text-green-700">{score}</span>: Correct
              </div>
              &nbsp; &nbsp;
              <div className="text-lg font-bold text-gray-700 mb-4">
                <span className="text-red-500">{incorrectAnswers}</span>:
                InCorrect
              </div>
              &nbsp;&nbsp;
              <div className="text-lg font-bold text-gray-700 mb-4">
                <span className="text-red-300">{unansweredQuestions}</span>:
                Unanswered
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => {
                setQuizFinished(false); // Reset for new quiz
                setCurrentQuestion(0);
                setTimeLeft(10);
                setScore(0);
              }}
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
            >
              Restart Quiz
            </button>
            <button
              onClick={handleExitQuiz}
              className="bg-pink-600 text-white py-2 ml-5 px-4 rounded hover:bg-pink-700"
            >
              Home Page
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <header className="w-full flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-pink-600">QUIZZy</h1>
            <button
              onClick={handleExitQuiz}
              className="text-pink-600 border border-pink-600 py-1 px-4 rounded hover:bg-pink-600 hover:text-white"
            >
              Exit Quiz
            </button>
          </header>

          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold text-gray-700">
              {currentQuestion + 1} / {questions[topic].length}
            </div>
            <div className="text-lg font-bold text-gray-700">
              0:{timeLeft.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded mb-4">
            <div
              className="h-full bg-pink-600 rounded"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions[topic].length) * 100
                }%`,
              }}
            ></div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {questions[topic][currentQuestion].question}
            </h2>
            <ul className="space-y-4">
              {/* {questions[topic][currentQuestion].options.map(
                (option, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      id={`option-${index}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                      className="w-5 h-5 text-pink-600 border-gray-300 focus:ring-pink-500"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="ml-3 text-gray-700 text-sm"
                    >
                      {option}
                    </label>
                  </li>
                )
              )} */}
              {questions[topic][currentQuestion].options.map(
                (option, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelection(option)}
                      className="w-5 h-5 text-pink-600 border-gray-300 focus:ring-pink-500"
                    />
                    <label
                      className="ml-3 text-gray-700 text-sm"
                      htmlFor={`option-${index}`}
                    >
                      {option}
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex justify-between">
            {currentQuestion < questions[topic].length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`py-2 px-4 rounded font-bold ${
                  selectedAnswer
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                Finish
              </button>
            )}
            <button
              onClick={skipQuestion}
              className="text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-200 focus:outline-none"
            >
              Skip this question
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Quiz Rules</h2>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Each question has a time limit of 10 seconds.</li>
              <li>Once you submit an answer, you cannot change it.</li>
              <li>You must select a topic before starting the quiz.</li>
              <li>Have fun and do your best!</li>
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    )}
    </>
  );
};
export default App;
