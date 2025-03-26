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
import arrow from "../assets/Vector.svg"
import "../Pages/Button.css"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import styled from "styled-components";
import ProgressBar from '../Components/ProgressBar'

const StyledSpan = styled.span`
  color: red;
`;

const questionsData = [
    { id: 1, text: "Which segment does your company belongs to?", options: ["Startup", "Scale Startup", "SME", "Mid Enterprises", "Large Enterprises", "Public Sector", "Non-Profit Organizations"] },
    { id: 2, text: "How many technical teams will be working with NexaStack?", options: ["0-10", "11-50", "51-100", "More Than 100", "Only Me"] },
    { id: 3, text: "Does your team have in-house AI/ML expertise, or do you need support?", options: ["We have an in-house AI/ML team", "We need external AI/ML support", "Need additional support", "Not sure yet, exploring options"] },
    { id: 4, text: "Do you have specific compliance requirements (e.g., GDPR, HIPAA)?", options: ["GDRP", "HIPAA", "None", "Not Sure"] },
    { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs? (you can select multiple)", options: ["On-Premises – We have enterprise-grade hardware", "On-Premises - Need hardware recommendations", "Amazon", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"] },
    { id: 6, text: "What is your primary use case for NexaStack?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Others (Please Specify)"] },
    { id: 7, text: "Are there specific AI models you plan to operate using NexaStack?", options: ["LLMs (Large Language Models)", "Vision Models", "Recommendation Systems", "Speech & Audio Models", "Custom AI/ML Models", "Not Sure, Need Guidance"] },
];

const BookDemo = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        industry: '',
        department: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleAnswer = (questionId, option) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: option
        }));

        //Next question moving
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
        //Enabling next (for last question)
        else if (currentQuestionIndex === questionsData.length - 1) {
            setIsLastQuestionAnswered(true);
        }
    };

    const handleNext = () => {
        
        if (Object.keys(selectedAnswers).length === questionsData.length) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) {
                errors[key] = 'This field is required';
            }
        });
        if (formData.email && !emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNextStep = () => {
        if (validateForm()) {
            setCurrentStep(3);
        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const progress = (Object.keys(selectedAnswers).length / questionsData.length) * 100;

    return (
        <div className='w-full md:flex md:flex-row flex-col justify-between mx-auto h-screen font-inter overflow-x-hidden'>
            <div className='w-full left-container flex flex-col items-start'>
                <h1 className='heading text-[24px] md:text-[64px] text-center md:tracking-[-2.69px] md:mb-0 w-full'>Book your <span>30-minute </span></h1>
                <h1 className='font-medium md:mt-[-26px] mt-[-10px] ml-[112px] text-[24px] md:text-[64px] text-center md:tracking-[-2.69px] md:ml-[87px]'>NexaStack demo.</h1>
                <p className='mt-16 text-[#3E57DA] ml-32 md:ml-24 tracking-[0.67px]'>WHAT TO EXPECT:</p>
                <div className='ml-10 md:ml-24 mt-8 space-y-2 md:space-y-3 flex items-start flex-col'>
                    <div className='flex items-center gap-x-1 md:gap-x-3'>
                        <img src={tick} alt='tick' /><p className='text-[#333B52] tracking-[-0.08px]'>Get a personalized demo of NexaStack</p>
                    </div>
                    <div className='flex items-center gap-x-1 md:gap-x-3 '>
                        <img src={tick} alt='tick' />  <p className='text-[#333B52] tracking-[-0.08px]'>Learn about pricing for your use case</p>
                    </div>
                    <div className='flex items-center gap-x-1 md:gap-x-3'>
                        <img src={tick} alt='tick' />
                        <p className='text-[#333B52] tracking-[-0.08px]'>Hear proven customer success stories</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex md:flex-row ml-24 mt-16 md:gap-x-12 gap-y-5 w-full'>
                    <img src={grdp} alt='grdp' className='w-[170px]' />
                    <img src={soc} alt='soc' className='w-[170px]' />
                    <img src={iso} alt='iso' className='w-[220px]' />
                </div>
                <div className='ml-10 mt-10 md:ml-24 md:mt-24'>
                    <h3 className='text-[#333B52]'>Trusted by over Top AI companies of all size</h3>
                </div>
                <div className='md:ml-14 md:mt-4 mt-10 mb-8'>
                    <div className='grid grid-cols-4 gap-x-10'>
                        <img src={zoom} alt='zoom' />
                        <img src={reuters} alt='reuters' />
                        <img src={heineken} alt='heineken' />
                        <img src={reuters} alt='reuters' />
                    </div>
                    <div className='grid grid-cols-4 gap-x-10'>
                        <img src={zoom} alt='zoom' />
                        <img src={reuters} alt='reuters' />
                        <img src={heineken} alt='heineken' />
                        <img src={reuters} alt='reuters' />
                    </div>
                </div>
            </div>
            <div className='right-container w-full'>
                <div className='logo-right flex w-full'>
                    <img src={logo} alt='comapny-logo' className='md:w-[200px] w-[140px] items-center' />
                </div>

                {/* Step 1 */}
                {currentStep === 1 && (
                    <div>
                        <div className='customise-container items-start flex flex-col ml-12 md:mt-20 mt-6'>
                            <h1 className='md:text-[32px] ml-2 md:ml-0'>Customize your 30 minute Demo</h1>
                            <p className='text-[#727272] w-96 -ml-8 md:w-full md:-ml-[104px] md:text-[24px] font-normal'>Setup your primary focus and customise the demo accordingly.</p>
                        </div>
                        <div className='w-96 mx-auto md:w-full items-center'>
                            <ProgressBar
                                bgcolor="#0066FF"
                                progress={Math.round(progress)}
                                height={9}
                            />
                        </div>
                        <div className="w-full mt-14">
                            <div key={questionsData[currentQuestionIndex].id} className="mb-6 flex flex-col">
                                <h2 className="text-sm md:text-xl font-semibold mb-2 text-start ml-6 md:ml-12 text-[22px] text-[#000000]">
                                    {questionsData[currentQuestionIndex].text} <StyledSpan>*</StyledSpan>
                                </h2>
                                <div className="flex flex-wrap gap-5 md:gap-6 md:gap-y-8 mx-4 md:ml-12 my-6 md:text-[15px]">
                                    {questionsData[currentQuestionIndex].options.map((option) => (
                                        <button
                                            key={option}
                                            className={`px-4 py-2 md:px-8 md:py-3 rounded-full border font-normal text-sm ${selectedAnswers[questionsData[currentQuestionIndex].id] === option ? "bg-blue-500 text-white" : "bg-[#F6F6F6]"}`}
                                            onClick={() => handleAnswer(questionsData[currentQuestionIndex].id, option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='text-white flex ml-64 mb-2 md:absolute md:bottom-12 md:right-12'>
                            <button
                                className={`btn-next flex gap-x-2 md:gap-x-6 items-center font-normal ${currentQuestionIndex === questionsData.length - 1 && isLastQuestionAnswered ? '' : 'opacity-50 cursor-not-allowed'}`}
                                onClick={handleNext}
                                disabled={!(currentQuestionIndex === questionsData.length - 1 && isLastQuestionAnswered)}
                            >
                                Next Step <img src={arrow} alt='arrow' />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                    <div>
                        <div className='customise-container items-start flex flex-col md:ml-10 mt-6 md:mt-20'>
                            <h1 className='md:text-[32px] flex mx-auto md:ml-0'>Your Information</h1>
                            <p className='text-[#727272] -ml-[11px] md:-ml-0 md:w-full md:text-[24px] font-normal'>Please provide your information and schedule the demo seamlessly.</p>
                        </div>
                        <div className='flex flex-col md:flex-row m-4 md:m-10 w-full space-y-4 md:space-y-0 md:space-x-16 mt-10'>
                            <div className='flex flex-col items-start w-11/12 md:w-5/12'>
                                <label>
                                    First Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    className={`p-2 md:px-3 rounded-lg border w-full mt-2 focus:outline-none ${formErrors.firstName ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your First Name"
                                />
                                {formErrors.firstName && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.firstName}</p>
                                )}
                            </div>
                            <div className='flex flex-col items-start w-11/12 md:w-5/12'>
                                <label>
                                    Last Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    className={`p-2 md:px-3 rounded-lg border w-full mt-2 focus:outline-none ${formErrors.lastName ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your Last Name"
                                />
                                {formErrors.lastName && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.lastName}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row m-4 md:m-10 w-full space-y-4 md:space-y-0 md:space-x-16 md:mt-10'>
                            <div className='flex flex-col items-start w-11/12 md:w-5/12'>
                                <label>
                                    Business Email ID <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    className={`p-2 md:px-3 rounded-lg border w-full mt-2 focus:outline-none ${formErrors.email ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your email id"
                                />
                                {formErrors.email && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
                                )}
                            </div>
                            <div className='flex flex-col items-start w-11/12 md:w-5/12'>
                                <label>
                                    Company Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    className={`p-2 md:px-3 rounded-lg border w-full mt-2 focus:outline-none ${formErrors.companyName ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your company Name"
                                />
                                {formErrors.companyName && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.companyName}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col w-11/12 mx-auto gap-y-5 md:gap-y-10 mt-5 md:mt-10'>
                            <div className='flex flex-col items-start md:ml-1'>
                                <label>
                                    Industry Belongs To <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`p-2 md:px-3 w-full rounded-lg border mt-2 bg-white focus:outline-none text-[#9C9AA5] ${formErrors.industry ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                >
                                    <option value="" className='text-[#9C9AA5]'>Select your Industry type</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                                {formErrors.industry && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.industry}</p>
                                )}
                            </div>
                            <div className='flex flex-col items-start md:ml-1'>
                                <label>
                                    Department / Team <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`p-2 md:px-3 w-full rounded-lg border mt-2 bg-white focus:outline-none text-[#9C9AA5] ${formErrors.department ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                >
                                    <option value="" className='text-[#9C9AA5]'>Select your Department/ Team</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                                {formErrors.department && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.department}</p>
                                )}
                            </div>
                        </div>
                        <div className='text-white flex ml-[248px] mb-2 md:absolute md:bottom-12 md:right-12 mt-6'>
                            <button
                                className='btn-next flex gap-x-6 items-center font-normal'
                                onClick={handleNextStep}
                            >
                                Next Step <img src={arrow} alt='arrow' />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                    <div className='w-full'>
                          <div className='customise-container items-start flex flex-col mt-6 md:mt-20'>
                            <h1 className='md:text-[32px] flex mx-auto md:ml-12'>Book Demo</h1>
                            <p className='text-[#727272] md:-ml-[108px] ml-0 md:w-full md:text-[24px] font-normal'>Please pick your suitable date and time slot for the demo.</p>
                        </div>
                        <div className='flex mt-10 ml-8'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="flex justify-center items-center gap-x-10 w-full">
                                    <DateCalendar
                                        disablePast
                                        // dayOfWeekFormatter={(day) => {
                                        //     const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                                        //     return days[day]; 
                                        // }}
                                        className="w-full max-w-lg"
                                        sx={{
                                            width: '500px',
                                            height: '450px',
                                            '& .MuiPickersDay-root': {
                                                marginX: '8px',
                                                '&:hover': {
                                                    backgroundColor: '#E6F2FF',
                                                },
                                            },
                                            '& .MuiDayCalendar-weekContainer': {
                                                justifyContent: 'center',
                                            },
                                            '& .MuiPickersDay-root:not(.MuiPickersDay-weekend)': {
                                                marginX: '12px',
                                            },
                                            // '& .MuiPickersDay-root.MuiPickersDay-weekend': {
                                            //     marginX: '1px',
                                            // },
                                            '& .Mui-selected': {
                                                backgroundColor: '#FF0000 !important',
                                                color: 'white !important',
                                                '&:hover': {
                                                    backgroundColor: '#FF3333 !important',
                                                },
                                            },
                                        }}
                                    />
                                    <div className="h-[300px] w-[1px] bg-gray-200"></div>
                                </div>
                            </LocalizationProvider>

                        </div>
                        <div className='flex flex-col items-start ml-12 md:ml-16 mt-10 md:mt-24'>
                            <p className='text-[#666666]'>Demo Scheduling</p>
                            <p>Time Zone : GMT +5:30 India/Asia</p>
                        </div>
                        <div className='text-white flex ml-[248px] mb-2 md:absolute md:bottom-12 md:right-12 mt-6'>
                            <button className='btn-next flex gap-x-2 md:gap-x-6 items-center font-normal'>
                                Book Demo <img src={arrow} alt='arrow' />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookDemo