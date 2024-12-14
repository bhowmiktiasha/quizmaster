import { useState } from "react";
import "./index.css";

const App = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const isButtonDisabled = !name || !topic;

  const questions = {
    Javascript: [
      {
        question:
          "Which method can be used to round a number to the nearest integer in JavaScript?",
        options: [
          "This method rounds a number up to the nearest integer, regardless of its decimal part.",
          "This method rounds a number down to the nearest integer, ignoring the decimal part.",
          "This method rounds a number to the nearest integer based on its decimal value.",
          "This method generates a random number between 0 and 1, without rounding.",
        ],
      },
      {
        question: "What is the correct syntax for a function in JavaScript?",
        options: [
          "function myFunction() { }",
          "function:myFunction() { }",
          "func myFunction() { }",
          "myFunction function() { }",
        ],
      },
    ],
    "React.js": [
      {
        question: "What is a hook in React?",
        options: [
          "A function that lets you hook into React state and lifecycle features.",
          "A component in React.",
          "A library to manage routing in React.",
          "A styling method in React.",
        ],
      },
    ],
    Flutter: [
      {
        question: "What is a hook in React?",
        options: [
          "A function that lets you hook into React state and lifecycle features.",
          "A component in React.",
          "A library to manage routing in React.",
          "A styling method in React.",
        ],
      },
    ],
    Vue: [
      {
        question: "What is a hook in React?",
        options: [
          "A function that lets you hook into React state and lifecycle features.",
          "A component in React.",
          "A library to manage routing in React.",
          "A styling method in React.",
        ],
      },
    ],
  };

  const handleStart = () => {
    setIsQuizStarted(true);
    setCurrentQuestion(0); // Reset to the first question when starting the quiz
  };

  const handleNext = () => {
    const totalQuestions = questions[topic].length;
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      {!isQuizStarted ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-white">
            Welcome to{" "}
            <span style={{ color: "#b33b72", fontWeight: "bold" }}>
              QUIZMania
            </span>
          </h1>
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
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
              <div className="flex space-x-4">
                {Object.keys(questions).map((t) => (
                  <div key={t}>
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
      ) : (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <header className="w-full flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-pink-600">QUIZMania</h1>
            <button className="text-pink-600 border border-pink-600 py-1 px-4 rounded hover:bg-pink-600 hover:text-white">
              Exit Quiz
            </button>
          </header>

          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold text-gray-700">
              {currentQuestion + 1} / {questions[topic].length}
            </div>
            <div className="text-lg font-bold text-gray-700">0:09</div>
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
              {questions[topic][currentQuestion].options.map(
                (option, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      id={`option-${index}`}
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
              )}
            </ul>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleNext}
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Next
            </button>
            <button className="text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-200 focus:outline-none">
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
              <li>Each question has a time limit of 30 seconds.</li>
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
  );
};
export default App;
