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
import "./Button.css"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import styled from "styled-components";
import ProgressBar from '../Components/ProgressBar'

const StyledSpan = styled.span`
  color: red;
`;
const ValuePiece = Date | null;

const Value = ValuePiece | [ValuePiece, ValuePiece];


const questionsData = [
    { id: 1, text: "Which segment does your company belongs to?", options: ["Startup", "Scale Startup", "SME", "Mid Enterprises", "Large Enterprises", "Public Sector", "Non-Profit Organizations"] },
    { id: 2, text: "How many technical teams will be working with NexaStack?", options: ["0-10", "11-50", "51-100", "More Than 100", "Only Me"] },
    { id: 3, text: "Does your team have in-house AI/ML expertise, or do you need support?", options: ["We have an in-house AI/ML team", "We need external AI/ML support", "Need additional support", "Not sure yet, exploring options"] },
    { id: 4, text: "Do you have specific compliance requirements (e.g., GDPR, HIPAA)?", options: ["GDRP", "HIPAA", "None", "Not Sure"] },
    { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs? (you can select multiple)", options: ["On-Premises – We have enterprise-grade hardware", "On-Premises - Need hardware recommendations", "Amazon", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"] },
    { id: 6, text: "What is your primary use case for NexaStack?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Others (Please Specify)"] },
    { id: 7, text: "Are there specific AI models you plan to operate using NexaStack??", options: ["LLMs (Large Language Models)", "Vision Models", "Recommendation Systems", "Speech & Audio Models", "Custom AI/ML Models", "Not Sure, Need Guidance"] },
    { id: 8, text: "Are there specific AI models you plan to operate using NexaStack??", options: ["LLMs (Large Language Models)", "Vision Models", "Recommendation Systems", "Speech & Audio Models", "Custom AI/ML Models", "Not Sure, Need Guidance"] }
];

const BookDemo = () => {
    // const [step,setStep]=useState(0)
    // const [answeredCount, setAnsweredCount] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleAnswer = (questionId, option) => {
        // setTimeout(2000)

        setSelectedAnswers((prev) => {
            const updatedAnswers = {
                ...prev,
                [questionId]: option
            };
            setCurrentIndex(prev => prev + 1)
            // const bothAnswered = currentQuestions.every(q => updatedAnswers[q.id]);
            // if (bothAnswered) {
            //     setCurrentIndex(prev => prev + 2);
            // }

            return updatedAnswers;
        });
    };


    const currentQuestions = questionsData.slice(currentIndex, currentIndex + 1);

    //Checking if both current questions are answered
    // const bothAnswered = currentQuestions.every(q => selectedAnswers[q.id]);
    const progress = (Object.keys(selectedAnswers).length / questionsData.length) * 100;

    // const handleNext = () => {
    //     if (bothAnswered) {
    //         setCurrentIndex(prev => prev + 2);
    //     }
    // };

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className='w-full flex justify-between mx-auto h-screen font-inter'>
            <div className='w-full left-container flex flex-col items-start'>
                <h1 className='heading text-[64px] text-center tracking-[-2.69px] mb-0'>Book your <span>30-minute </span></h1>
                <h1 className='font-medium mt-[-26px] text-[64px] text-center tracking-[-2.69px] ml-[87px]'>NexaStack demo.</h1>
                <p className='mt-12 text-[#3E57DA] ml-24 tracking-[0.67px]'>WHAT TO EXPECT:</p>
                <div className='ml-24 mt-4 space-y-4 flex items-start flex-col'>
                    <div className='flex items-center gap-x-3'>
                        <img src={tick} alt='tick'/><p className='text-[#333B52] tracking-[-0.08px]'>Get a personalized demo of NexaStack</p>
                    </div>
                    <div className='flex items-center gap-x-3 '>
                        <img src={tick} alt='tick'/>  <p className='text-[#333B52] tracking-[-0.08px]'>Learn about pricing for your use case</p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <img src={tick} alt='tick'/>
                        <p className='text-[#333B52] tracking-[-0.08px]'>Hear proven customer success stories</p>
                    </div>

                </div>
                <div className='flex ml-24 mt-12 gap-x-12'>
                    <img src={grdp} alt='grdp'/>
                    <img src={soc} alt='soc'/>
                    <img src={iso} alt='iso'/>
                </div>
                <div className='ml-24 mt-24'>
                    <h3 className='text-[#333B52]'>Trusted by over Top AI companies of all size</h3>
                </div>
                <div className='ml-14 mt-4'>
                    <div className='grid grid-cols-4 gap-x-10'>
                        <img src={zoom} alt='zoom'/>
                        <img src={reuters} alt='reuters'/>
                        <img src={heineken} alt='heineken'/>
                        <img src={reuters} alt='reuters'/>
                    </div>
                    <div className='grid grid-cols-4 gap-x-10'>
                    <img src={zoom} alt='zoom'/>
                        <img src={reuters} alt='reuters'/>
                        <img src={heineken} alt='heineken'/>
                        <img src={reuters} alt='reuters'/>
                    </div>
                </div>
            </div>
            <div className='right-container w-full'>
                <div className='logo-right'>
                    <img src={logo} alt='comapny-logo'/>
                </div>

                {/* 1st step */}

                <div>
                    <div className='customise-container items-start flex flex-col ml-12 mt-20'>
                        <h1 className='font-[32px]'>Customize your 30 minute Demo</h1>
                        <p className='text-[#727272] text-[24px] font-normal'>Setup your primary focus and customise the demo accordingly.</p>
                    </div>
                    <div className='w-full '>
                        <ProgressBar
                            bgcolor="#0066FF"
                            progress={Math.round(progress)}
                            height={9}
                        />
                    </div>
                    <div className="w-full mt-14">
                        {currentQuestions.map((q) => (
                            <div key={q.id} className="mb-6 flex flex-col">
                                <h2 className="text-lg font-semibold mb-2 text-start ml-12 text-[22px] text-[#000000]">{q.text} <StyledSpan>*</StyledSpan></h2>
                                <div className="flex flex-wrap gap-6 gap-y-8 ml-12 my-6 text-[15px]">
                                    {q.options.map((option) => (
                                        <button
                                            key={option}
                                            className={`px-8 py-3 rounded-full border font-normal text-sm ${selectedAnswers[q.id] === option ? "bg-blue-500 text-white" : "bg-[#F6F6F6]"
                                                }`}
                                            onClick={() => (handleAnswer(q.id, option))}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='text-white flex absolute bottom-12 right-12'>
                        {/* //Disbaled */}
                        <button className={`btn-next flex gap-x-6 items-center font-normal`} >Next Step <img src={arrow} alt='arrow'/></button>
                    </div>
                </div>


                {/* 2nd step */}

                {/* <div>
                    <div className='customise-container items-start flex flex-col ml-12 mt-20'>
                        <h1 className='font-[32px]'>Your Information</h1>
                        <p className='text-[#727272] text-[24px] font-normal'>Please provide your information and schedule the demo seamlessly.</p>
                    </div>
                    <div className='flex flex-row m-10 w-full space-x-16 mt-10'>
                        <div className='flex flex-col items-start w-5/12'>
                            <label>
                                First Name <StyledSpan>*</StyledSpan>
                            </label>
                            <input
                                className='p-2 rounded-lg border border-[#465FF166] w-full mt-2 focus:outline-none'
                                type="text"
                                // value={formData.name}
                                name="name"
                                autoComplete="off"
                                placeholder="Please enter your First Name"
                            // onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col items-start w-5/12'>
                            <label>
                                Last Name <StyledSpan>*</StyledSpan>
                            </label>
                            <input
                                className='p-2 rounded-lg border border-[#465FF166] w-full mt-2 focus:outline-none'
                                type="text"
                                // value={formData.name}
                                name="name"
                                autoComplete="off"
                                placeholder="Please enter your Last Name"
                            // onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row m-10 w-full space-x-16 mt-10'>
                        <div className='flex flex-col items-start w-5/12'>
                            <label>
                                Business Email ID <StyledSpan>*</StyledSpan>
                            </label>
                            <input
                                className='p-2 rounded-lg border border-[#465FF166] w-full mt-2 focus:outline-none'
                                type="text"
                                // value={formData.name}
                                name="name"
                                autoComplete="off"
                                placeholder="Please enter your email id"
                            // onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col items-start w-5/12'>
                            <label>
                                Company Name <StyledSpan>*</StyledSpan>
                            </label>
                            <input
                                className='p-2 rounded-lg border border-[#465FF166] w-full mt-2 focus:outline-none'
                                type="text"
                                // value={formData.name}
                                name="name"
                                autoComplete="off"
                                placeholder="Please enter your company Name"
                            // onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-11/12 mx-auto gap-y-10 mt-10'>
                        <div className='flex flex-col items-start'>
                            <label>
                                Industry Belongs To <StyledSpan>*</StyledSpan>
                            </label>
                            <select className='p-2 w-full rounded-lg border border-[#465FF166] mt-2 bg-white text-[#9C9AA5] focus:outline-none'
                                value={selectedValue} onChange={handleChange}>
                                <option value="">Select your Industry type</option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label >
                                Department / Team <StyledSpan>*</StyledSpan>
                            </label>
                            <select className='p-2 w-full rounded-lg border border-[#465FF166] mt-2 bg-white text-[#9C9AA5] focus:outline-none'
                                value={selectedValue} onChange={handleChange}>
                                <option value="">Select your Department/ Team</option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                    <div className='text-white flex absolute bottom-12 right-12'>
                        <button className={`btn-next flex gap-x-6 items-center font-normal`} >Next Step <img src={arrow} /></button>
                    </div>
                </div> */}


                {/* 3rd step */}

                {/* <div>
                    <div className='customise-container items-start flex flex-col ml-12 mt-20'>
                        <h1 className='font-[32px]'>Book Demo</h1>
                        <p className='text-[#727272] text-[24px] font-normal'>Please pick your suitable date and time slot for the demo.</p>
                    </div>
                    <div className='flex mt-10'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar disablePast/>
                            <DemoItem label="Available Time Slots">
                                <TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                    <div className='flex flex-col items-start ml-16 mt-24'>
                        <p className='text-[#666666]'>Demo Scheduling</p>
                        <p>Time Zone : GMT +5:30 India/Asia</p>
                    </div>
                    <div className='text-white flex absolute bottom-12 right-12'>
                        <button className={`btn-next flex gap-x-6 items-center font-normal`} >Book Demo <img src={arrow} /></button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default BookDemo