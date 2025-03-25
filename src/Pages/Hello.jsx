import React, { useState } from "react";
import "./BookDemo.css";
import tick from "../assets/Ticks.svg";
import grdp from "../assets/1.svg";
import soc from "../assets/2.svg";
import iso from "../assets/3.svg";
import zoom from "../assets/zoom.svg";
import reuters from "../assets/reuters.svg";
import heineken from "../assets/heineken.svg";
import logo from "../assets/NexaStack.svg";
import arrow from "../assets/Vector.svg";
import "../Pages/Button.css";
import Progress_bar from "../Components/ProgressBar";

const questionsData = [
  { id: 1, text: "What is React?", options: ["Library", "Framework", "Language", "Tool"] },
  { id: 2, text: "What is Tailwind?", options: ["CSS Framework", "JavaScript Library", "Database", "Compiler"] },
  { id: 3, text: "What is JSX?", options: ["Syntax Extension", "Programming Language", "Database", "Tool"] },
  { id: 4, text: "Which hook is used for state?", options: ["useState", "useEffect", "useRef", "useContext"] },
  { id: 5, text: "What does useEffect do?", options: ["Handles Side Effects", "Manages State", "Creates Components", "Styles Components"] },
  { id: 6, text: "What is the virtual DOM?", options: ["JavaScript Representation", "HTML Copy", "Database", "API"] },
  { id: 7, text: "What is Next.js?", options: ["React Framework", "JavaScript Library", "CSS Tool", "API"] },
  { id: 8, text: "What is useRef used for?", options: ["DOM Manipulation", "State Management", "API Calls", "Styling"] },
];

const BookDemo = () => {
  const [answeredCount, setAnsweredCount] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = (questionId, option) => {
    if (selectedAnswers[questionId]) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    setAnsweredCount((prev) => prev + 2);
    setCurrentIndex((prev) => prev + 2);
  };

  const progress = (answeredCount / questionsData.length) * 100;
  const currentQuestions = questionsData.slice(currentIndex, currentIndex + 2);

  return (
    <div className="w-full flex justify-between mx-auto h-screen font-inter">
      {/* Left Container */}
      <div className="w-full left-container flex flex-col items-start">
        <h1 className="heading text-[66px] text-center tracking-[-2.69px] mb-0">
          Book your <span>30-minute </span>
        </h1>
        <h1 className="font-medium mt-[-26px] text-[66px] text-center tracking-[-2.69px] ml-[87px]">
          NexaStack demo.
        </h1>
        <p className="mt-12 text-[#3E57DA] ml-24 tracking-[0.67px]">WHAT TO EXPECT:</p>
        <div className="ml-24 mt-4 space-y-4 flex items-start flex-col">
          <div className="flex items-center gap-x-3">
            <img src={tick} alt="tick" />
            <p className="text-[#333B52] tracking-[-0.08px]">Get a personalized demo of NexaStack</p>
          </div>
          <div className="flex items-center gap-x-3 ">
            <img src={tick} alt="tick" />
            <p className="text-[#333B52] tracking-[-0.08px]">Learn about pricing for your use case</p>
          </div>
          <div className="flex items-center gap-x-3">
            <img src={tick} alt="tick" />
            <p className="text-[#333B52] tracking-[-0.08px]">Hear proven customer success stories</p>
          </div>
        </div>
        <div className="flex ml-24 mt-12 gap-x-12">
          <img src={grdp} alt="grdp" />
          <img src={soc} alt="soc" />
          <img src={iso} alt="iso" />
        </div>
        <div className="ml-24 mt-24">
          <h3 className="text-[#333B52]">Trusted by over Top AI companies of all size</h3>
        </div>
        <div className="ml-14 mt-4">
          <div className="grid grid-cols-4 gap-x-10">
            <img src={zoom} alt="zoom" />
            <img src={reuters} alt="reuters" />
            <img src={heineken} alt="heineken" />
            <img src={reuters} alt="reuters" />
          </div>
          <div className="grid grid-cols-4 gap-x-10">
            <img src={zoom} alt="zoom" />
            <img src={reuters} alt="reuters" />
            <img src={heineken} alt="heineken" />
            <img src={reuters} alt="reuters" />
          </div>
        </div>
      </div>

      {/* Right Container */}
      <div className="right-container w-full">
        <div className="logo-right">
          <img src={logo} alt="logo" />
        </div>
        <div className="customise-container items-start flex flex-col ml-12 mt-20">
          <h1 className="text-[32px] font-semibold">Customize your 30 minute Demo</h1>
          <p className="text-[#727272] text-[24px] font-normal">
            Setup your primary focus and customize the demo accordingly.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6">
          <Progress_bar bgcolor="#0066FF" progress={progress} height={9} />
        </div>

        {/* Questions */}
        <div className="w-full mt-6 px-12">
          {currentQuestions.map((q) => (
            <div key={q.id} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{q.text}</h3>
              <div className="flex flex-col gap-2">
                {q.options.map((option) => (
                  <button
                    key={option}
                    className={`py-2 px-4 border rounded ${
                      selectedAnswers[q.id] === option ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleAnswer(q.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Next Step Button */}
        {answeredCount === questionsData.length && (
          <div className="text-white flex absolute bottom-12 right-12">
            <button className="btn-next flex gap-x-6 items-center font-normal">
              Next Step <img src={arrow} alt="arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDemo;