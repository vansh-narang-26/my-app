import React, { useState, useCallback, useEffect } from 'react';
import "./BookDemo.css";

// Simulated imports (replace with actual imports in your project)
const tick = "/api/placeholder/20/20"; // tick icon placeholder
const logo = "/api/placeholder/140/40"; // logo placeholder
const arrow = "/api/placeholder/20/20"; // arrow icon placeholder
const backArrow = "/api/placeholder/20/20"; // back arrow icon placeholder

// Sample data for questions
const questionsData = [
  { id: 1, text: "Which segment does your company belongs to?", options: ["Startup", "Scale Startup", "SME", "Mid Enterprises", "Large Enterprises", "Public Sector", "Non-Profit Organizations"] },
  { id: 2, text: "How many technical teams will be working with NexaStack?", options: ["0-10", "11-50", "51-100", "More Than 100", "Only Me"] },
  { id: 3, text: "Does your team have in-house AI/ML expertise, or do you need support?", options: ["We have an in-house AI/ML team", "We need external AI/ML support", "Need additional support", "Not sure yet, exploring options"] },
  { id: 4, text: "Do you have specific compliance requirements (e.g., GDPR, HIPAA)?", options: ["GDRP", "HIPAA", "None", "Not Sure"] },
  { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs?", options: ["On-Premises – We have enterprise-grade hardware", "On-Premises - Need hardware recommendations", "Amazon", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"], multiSelect: true, helpText: "You can select multiple options" },
  { id: 6, text: "What is your primary use case for NexaStack?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Others (Please Specify)"], hasOther: true },
  { id: 7, text: "Are there specific AI models you plan to operate using NexaStack?", options: ["LLMs (Large Language Models)", "Vision Models", "Recommendation Systems", "Speech & Audio Models", "Custom AI/ML Models", "Not Sure, Need Guidance"] },
];

// Style components
const StyledSpan = ({ children }) => (
  <span style={{ color: 'red' }}>{children}</span>
);

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 40,
  };
  
  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    transition: 'width 0.3s ease-in-out',
  };
  
  return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  );
};

const ImprovedDemoBooking = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [multiSelectAnswers, setMultiSelectAnswers] = useState({});
  const [otherText, setOtherText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pendingAnswer, setPendingAnswer] = useState(null);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState('');
  const [activeOptionAnimation, setActiveOptionAnimation] = useState(false);

  // Option animation variants
  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Handle selection of an answer with improved UX
  const handleAnswer = useCallback((questionId, option) => {
    const currentQuestion = questionsData.find(q => q.id === questionId);

    if (currentQuestion.multiSelect) {
      // Handling multi-select questions (like question 5)
      setMultiSelectAnswers(prev => {
        const selections = prev[questionId] || [];
        
        if (selections.includes(option)) {
          // Remove if already selected
          return { ...prev, [questionId]: selections.filter(item => item !== option) };
        } else {
          // Add new selection
          return { ...prev, [questionId]: [...selections, option] };
        }
      });
      
      // Update answered questions tracking
      if (!answeredQuestions.includes(currentQuestionIndex)) {
        setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
      }
    } else if (currentQuestion.hasOther && option === "Others (Please Specify)") {
      // Handling "Others" option in question 6
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: option
      }));
      
      setShowOtherInput(true);
      
      if (!answeredQuestions.includes(currentQuestionIndex)) {
        setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
      }
    } else {
      // Visual feedback for selection
      setActiveOptionAnimation(true);
      setPendingAnswer({ questionId, option });
      
      // Normal selection handling with smooth animation
      setTimeout(() => {
        setSelectedAnswers(prev => ({
          ...prev,
          [questionId]: option
        }));
        
        if (!answeredQuestions.includes(currentQuestionIndex)) {
          setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
        }
        
        setPendingAnswer(null);
        setActiveOptionAnimation(false);
        
        // Auto-advance to next question after selection (except for multi-select)
        if (currentQuestionIndex < questionsData.length - 1) {
          setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
          }, 300);
        } else if (currentQuestionIndex === questionsData.length - 1) {
          setIsLastQuestionAnswered(true);
        }
      }, 400);
    }
  }, [currentQuestionIndex, answeredQuestions, multiSelectAnswers]);

  // Handle "Other" text input
  const handleOtherTextChange = (e) => {
    setOtherText(e.target.value);
    setOtherInputValue(e.target.value);
  };

  // Handle going to previous question with improved animation
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Add a slight delay for animation
      setActiveOptionAnimation(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setActiveOptionAnimation(false);
        
        // Clear "Other" input if moving back from question 6
        if (currentQuestionIndex === 6 && showOtherInput) {
          setShowOtherInput(false);
        }
      }, 200);
    }
  };

  // Handle next step with validation
  const handleNext = () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    let canProceed = false;
    
    // Validation logic for different question types
    if (currentQuestion.multiSelect) {
      // For multi-select questions, require at least one selection
      canProceed = multiSelectAnswers[currentQuestion.id]?.length > 0;
    } else if (currentQuestion.hasOther && selectedAnswers[currentQuestion.id] === "Others (Please Specify)") {
      // For "Others" option, require text input
      canProceed = otherText.trim() !== '';
    } else {
      // For standard questions, require an answer
      canProceed = !!selectedAnswers[currentQuestion.id];
    }
    
    if (canProceed) {
      // If all conditions are met, proceed
      if (currentQuestionIndex === questionsData.length - 1) {
        // Move to next step if on last question
        setCurrentStep(prevStep => prevStep + 1);
      } else {
        // Find the next unanswered question
        const nextUnansweredIndex = findNextUnansweredQuestion();
        if (nextUnansweredIndex !== -1) {
          setCurrentQuestionIndex(nextUnansweredIndex);
        } else {
          // If all questions answered, proceed to next step
          setCurrentStep(prevStep => prevStep + 1);
        }
      }
    } else {
      // Visual feedback for validation failure
      alert("Please answer the current question to proceed.");
    }
  };
  
  // Helper function to find next unanswered question
  const findNextUnansweredQuestion = () => {
    for (let i = 0; i < questionsData.length; i++) {
      const question = questionsData[i];
      let isAnswered = false;
      
      if (question.multiSelect) {
        isAnswered = multiSelectAnswers[question.id]?.length > 0;
      } else if (question.hasOther && selectedAnswers[question.id] === "Others (Please Specify)") {
        isAnswered = otherText.trim() !== '';
      } else {
        isAnswered = !!selectedAnswers[question.id];
      }
      
      if (!isAnswered) {
        return i;
      }
    }
    
    return -1;
  };

  // Save and continue for "Others" option
  const handleSaveOther = () => {
    if (otherText.trim()) {
      // Update answers
      setSelectedAnswers(prev => ({
        ...prev,
        6: otherText.trim()
      }));
      
      // Hide the input and proceed to next question
      setShowOtherInput(false);
      
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsLastQuestionAnswered(true);
      }
    }
  };
  
  // Calculate progress for progress bar
  const progress = ((answeredQuestions.length + (pendingAnswer ? 1 : 0)) / questionsData.length) * 100;

  // Check if current question is a multi-select question
  const isMultiSelect = questionsData[currentQuestionIndex]?.multiSelect;
  
  // Check if current question has been answered
    const isCurrentQuestionAnswered = () => {
        const currentQuestion = questionsData[currentQuestionIndex];
        
        if (currentQuestion.multiSelect) {
        return multiSelectAnswers[currentQuestion.id]?.length > 0;
        } else if (currentQuestion.hasOther && selectedAnswers[currentQuestion.id] === "Others (Please Specify)") {
        return otherText.trim() !== '';
        } else {
        return !!selectedAnswers[currentQuestion.id];
        }
    };

  // Render multi-select chips
//   const renderMultiSelectChips = (questionId) => {
//     if (!multiSelectAnswers[questionId] || multiSelectAnswers[questionId].length === 0) {
//       return null;
//     }
    
//     return (
//       <div className="mt-4 ml-3 md:ml-12 mb-4">
//         <p className="text-sm text-gray-600 mb-2">Selected options:</p>
//         <div className="flex flex-wrap gap-2">
//           {multiSelectAnswers[questionId].map(option => (
//             <span
//               key={option}
//               className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center"
//             >
//               {option}
//               <button
//                 className="ml-2 text-blue-800 hover:text-blue-500"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setMultiSelectAnswers(prev => ({
//                     ...prev,
//                     [questionId]: prev[questionId].filter(item => item !== option)
//                   }));
//                 }}
//               >
//                 X
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//     );
//   };

  return (
    <div className="w-full flex flex-col h-screen font-sans">
      {/* Header with logo */}
      <div className="mt-6 md:mt-10 flex items-center justify-center md:justify-start md:ml-14">
        <img src={logo} alt="company-logo" className="w-[140px] md:w-[180px]" />
      </div>
      
      {/* Step 1: Customization Questions */}
      {currentStep === 1 && (
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center md:items-start mt-6 md:mt-10">
            <h1 className="text-2xl md:text-3xl font-semibold">Customize your 30-Minute Demo</h1>
            <p className="text-gray-500 text-center md:text-left text-base md:text-lg mt-2">
              Setup your primary focus and customize the demo accordingly.
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full mt-6">
            <ProgressBar 
              bgcolor="#0066FF"
              progress={Math.max(5, Math.round(progress))}
              height={8}
            />
          </div>
          
          {/* Question Container with Animation */}
          <div className={`mt-10 transition-opacity duration-300 ${activeOptionAnimation ? 'opacity-50' : 'opacity-100'}`}>
            {/* Current Question */}
            <div key={questionsData[currentQuestionIndex].id} className="mb-6">
              <h2 className="font-semibold mb-4 text-start text-lg md:text-xl text-black">
                {questionsData[currentQuestionIndex].text} <StyledSpan>*</StyledSpan>
              </h2>
              
              {/* Help text for multi-select questions */}
              {isMultiSelect && (
                <p className="text-sm text-blue-600 mb-3 italic">
                  {questionsData[currentQuestionIndex].helpText || "You can select multiple options"}
                </p>
              )}
              
              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
                {questionsData[currentQuestionIndex].options.map((option) => {
                      const isMultiSelect = questionsData[currentQuestionIndex].multiSelect;
                  const currentQuestionId = questionsData[currentQuestionIndex].id;
                  let isSelected = false;
                  
                  if (isMultiSelect) {
                    isSelected = multiSelectAnswers[currentQuestionId]?.includes(option);
                  } else {
                    isSelected = selectedAnswers[currentQuestionId] === option;
                  }
                  
                  return (
                    <button
                      key={option}
                      className={`px-4 py-3 rounded-full border text-base transition-all duration-200
                        ${isSelected 
                          ? "bg-blue-500 text-white border-blue-500" 
                          : "bg-gray-50 hover:bg-gray-100 border-gray-200"}
                        ${pendingAnswer && pendingAnswer.option === option 
                          ? "animate-pulse bg-blue-400 text-white" 
                          : ""}`}
                      onClick={() => handleAnswer(currentQuestionId, option)}
                      disabled={pendingAnswer !== null}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              
              {/* Multi-select chips display */}
              {/* {isMultiSelect && renderMultiSelectChips(questionsData[currentQuestionIndex].id)} */}
              
              {/* "Other" text input for Question 6 */}
              {questionsData[currentQuestionIndex].id === 6 &&
                selectedAnswers[6] === "Others (Please Specify)" && showOtherInput && (
                <div className="w-full mt-4 mb-6 animate-fadeIn">
                  <input
                    type="text"
                    maxLength={100}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please specify your use case"
                    value={otherInputValue}
                    onChange={handleOtherTextChange}
                    autoFocus
                  />
                  <button
                    className={`mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors
                      ${!otherInputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSaveOther}
                    disabled={!otherInputValue.trim()}
                  >
                    Save & Continue
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 py-4 border-t border-gray-100">
            <button
              className={`flex items-center gap-x-2 font-medium transition-all 
                ${currentQuestionIndex === 0 
                  ? 'opacity-50 cursor-not-allowed text-gray-400' 
                  : 'text-blue-600 hover:text-blue-700'}`}
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <img src={backArrow} alt="back" className="w-4 h-4" /> Previous
            </button>

            <button
              className={`flex items-center gap-x-2 px-6 py-2 rounded-lg bg-blue-500 text-white transition-all
                ${(!isCurrentQuestionAnswered() && !isLastQuestionAnswered) 
                  ? 'opacity-50 cursor-not-allowed bg-blue-400' 
                  : 'hover:bg-blue-600'}`}
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered() && !isLastQuestionAnswered}
            >
              Next Step <img src={arrow} alt="next" className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedDemoBooking;