import React, { useState } from 'react'
import "./BookDemo.css"
import tick from "../assets/Ticks.svg"
import grdp from "../assets/1.svg"
import soc from "../assets/2.svg"
import iso from "../assets/3.svg"
import zoom from "../assets/zoom.svg"
import reuters from "../assets/reuters.svg"
import heineken from "../assets/heineken.svg"
import logo from "../assets/NexaStack.svg"
// import Button from '../Components/Button'
import arrow from "../assets/Vector.svg"
import "../Pages/Button.css"
import Progress_bar from '../Components/ProgressBar'


const questionsData = [
    { id: 1, text: "Which segment does your company belongs to?", options: ["Startup", "Scale Startup", "SME", "Mid Enterprises", "Large Enterprises", "Public Sector", "Non-Profit Organizations"] },
    { id: 2, text: "How many technical teams will be working with NexaStack?", options: ["0-10", "11-50", "51-100", "More Than 100", "Only Me"] },
    { id: 3, text: "Does your team have in-house AI/ML expertise, or do you need support?", options: ["We have an in-house AI/ML team", "We need external AI/ML support", "Need additional support", "Not sure yet, exploring options"] },
    { id: 4, text: "Do you have specific compliance requirements (e.g., GDPR, HIPAA)?", options: ["GDRP", "HIPAA", "None", "Not Sure"] },
    { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs? (you can select multiple)", options: ["On-Premises – We have enterprise-grade hardware", "On-Premises – Need hardware recommendations", "Amazon", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"] },
    { id: 6, text: "What is your primary use case for NexaStack? ?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Others (Please Specify)"] },
    { id: 7, text: "Are there specific AI models you plan to operate using NexaStack??", options: ["LLMs (Large Language Models)", "Vision Models", "Recommendation Systems", "Speech & Audio Models", "Custom AI/ML Models", "Not Sure, Need Guidance"] },
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

    const progress = parseInt(answeredCount / questionsData.length) * 100;
    const currentQuestions = questionsData.slice(currentIndex, currentIndex + 2);

    return (
        <div className='w-full flex justify-between mx-auto h-screen font-inter'>
            <div className='w-full left-container flex flex-col items-start'>
                <h1 className='heading text-[66px] text-center tracking-[-2.69px] mb-0'>Book your <span>30-minute </span></h1>
                <h1 className='font-medium mt-[-26px] text-[66px] text-center tracking-[-2.69px] ml-[87px]'>NexaStack demo.</h1>
                <p className='mt-12 text-[#3E57DA] ml-24 tracking-[0.67px]'>WHAT TO EXPECT:</p>
                <div className='ml-24 mt-4 space-y-4 flex items-start flex-col'>
                    <div className='flex items-center gap-x-3'>
                        <img src={tick} /><p className='text-[#333B52] tracking-[-0.08px]'>Get a personalized demo of NexaStack</p>
                    </div>
                    <div className='flex items-center gap-x-3 '>
                        <img src={tick} />  <p className='text-[#333B52] tracking-[-0.08px]'>Learn about pricing for your use case</p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <img src={tick} />
                        <p className='text-[#333B52] tracking-[-0.08px]'>Hear proven customer success stories</p>
                    </div>

                </div>
                <div className='flex ml-24 mt-12 gap-x-12'>
                    <img src={grdp} />
                    <img src={soc} />
                    <img src={iso} />
                </div>
                <div className='ml-24 mt-24'>
                    <h3 className='text-[#333B52]'>Trusted by over Top AI companies of all size</h3>
                </div>
                <div className='ml-14 mt-4'>
                    <div className='grid grid-cols-4 gap-x-10'>
                        <img src={zoom} />
                        <img src={reuters} />
                        <img src={heineken} />
                        <img src={reuters} />
                    </div>
                    <div className='grid grid-cols-4 gap-x-10'>
                        <img src={zoom} />
                        <img src={reuters} />
                        <img src={heineken} />
                        <img src={reuters} />
                    </div>
                </div>
            </div>
            <div className='right-container w-full'>
                <div className='logo-right'>
                    <img src={logo} />
                </div>
                <div className='customise-container items-start flex flex-col ml-12 mt-20'>
                    <h1 className='font-[32px]'>Customize your 30 minute Demo</h1>
                    <p className='text-[#727272] text-[24px] font-normal'>Setup your primary focus and customise the demo accordingly.</p>
                </div>
                <div className='w-full '>
                    {/* <progress value={0.5}/> */}
                    {/* Progress bar */}
                    <Progress_bar
                        bgcolor="#0066FF"
                        progress={progress}
                        height={9}
                    />
                </div>
                <div className="w-full mt-14">
                    {currentQuestions.map((q) => (
                        <div key={q.id} className="mb-6 flex flex-col">
                            <h2 className="text-lg font-normal mb-2 text-start ml-12 text-[22px] text-[#000000]">{q.text}</h2>
                            <div className="flex-1 flex-row space-x-6 space-y-6 text-start ml-12">
                                {q.options.map((option) => (
                                    <button
                                        key={option}
                                        className={`px-4 py-1 rounded-full border font-normal ${selectedAnswers[q.id] === option ? "bg-blue-500 text-white" : "bg-[#F6F6F6]"
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
                <div className='text-white flex absolute bottom-12 right-12'>
                    <button className={`btn-next flex gap-x-6 items-center font-normal`} disabled={progress<=99}>Next Step <img src={arrow} /></button>
                </div>
            </div>
        </div>
    )
}

export default BookDemo