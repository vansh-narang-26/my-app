import React, { useState, useCallback, useEffect } from 'react'
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
import { motion } from 'framer-motion';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import styled from "styled-components";
import { useMediaQuery } from '@mui/material';
import ProgressBar from '../Components/ProgressBar'

const StyledSpan = styled.span`
  color: red;
`;
const dept = [
    { value: "IT", label: "IT" },
    { value: "Finance", label: "Finance" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Operations", label: "Operations" },
    { value: "Research and Development", label: "Research and Development" },
    { value: "Customer Support", label: "Customer Support" },
]
const questionsData = [
    { id: 1, text: "Which segment does your company belongs to?", options: ["Startup", "Scale Startup", "SME", "Mid Enterprises", "Large Enterprises", "Public Sector", "Non-Profit Organizations"] },
    { id: 2, text: "How many technical teams will be working with NexaStack?", options: ["0-10", "11-50", "51-100", "More Than 100", "Only Me"] },
    { id: 3, text: "Does your team have in-house AI/ML expertise, or do you need support?", options: ["We have an in-house AI/ML team", "We need external AI/ML support", "Need additional support", "Not sure yet, exploring options"] },
    { id: 4, text: "Do you have specific compliance requirements (e.g., GDPR, HIPAA)?", options: ["GDRP", "HIPAA", "None", "Not Sure"] },
    { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs? (you can select multiple)", options: ["On-Premises – We have enterprise-grade hardware", "On-Premises - Need hardware recommendations", "Amazon", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"] },
    { id: 6, text: "What is your primary use case for NexaStack?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Others (Please Specify)"] },
    { id: 7, text: "Are there specific AI models you plan to operate using NexaStack?", options: ["LLMs (Large Language Models)", "Vision Models", "Recommendation Systems", "Speech & Audio Models", "Custom AI/ML Models", "Not Sure, Need Guidance"] },
];
const IndustryList = [
    { value: "Aerospace", label: "Aerospace" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Automotive", label: "Automotive" },
    { value: "Banking and Finance Sector", label: "Banking and Finance Sector", },
    { value: "Consumer Goods", label: "Consumer Goods" },
    { value: "Consumer Technology", label: "Consumer Technology" },
    { value: "Education", label: "Education" },
    { value: "Enterprise Technology", label: "Enterprise Technology" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Gaming", label: "Gaming" },
    { value: "Government", label: "Government" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Insurance", label: "Insurance" },
    { value: "Life Sciences", label: "Life Sciences" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Marketing & Advertising", label: "Marketing & Advertising" },
    { value: "Media", label: "Media" },
    { value: "Mining", label: "Mining" },
    { value: "Non-Profit Organization", label: "Non-Profit Organization" },
    { value: "Oil and Gas", label: "Oil and Gas" },
    { value: "Power & Utilities", label: "Power & Utilities" },
    { value: "Professional Services", label: "Professional Services" },
    { value: "Real Estate and Construction", label: "Real Estate and Construction", },
    { value: "Retail", label: "Retail" },
    { value: "Telecommunication", label: "Telecommunication" },
    { value: "Transportation and Logistics", label: "Transportation and Logistics", },
    { value: "Travel", label: "Travel" },
    { value: "Wholesale and Distribution", label: "Wholesale and Distribution", },
    { value: "Other", label: "Other" },
];

const BookDemo = () => {
    var todayDate = new Date().toISOString().slice(0, 10);
    const isDesktop = useMediaQuery('(min-width:768px)');
    const [value, setValue] = React.useState(dayjs(todayDate));
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(3);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [selectedValue, setSelectedValue] = useState('');
    const [pendingAnswer, setPendingAnswer] = useState(null);
    const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
    // const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        industry: '',
        department: ''
    });
    const [formErrors, setFormErrors] = useState({});
    // console.log(todayDate);

    const handleAnswer = useCallback((questionId, option) => {
        setPendingAnswer({ questionId, option });
        // setLoading(false)

        setTimeout(() => {
            setSelectedAnswers((prev) => ({
                ...prev,
                [questionId]: option
            }));


            setPendingAnswer(null);
            // setLoading(true)

            if (currentQuestionIndex < questionsData.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            }

            else if (currentQuestionIndex === questionsData.length - 1) {
                setIsLastQuestionAnswered(true);
            }
        }, 500);
    }, [currentQuestionIndex]);

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

        if (name === 'firstName' || name === 'lastName') {
            const regex = /^[a-zA-Z\s]+$/;
            if (!regex.test(value)) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: 'Only alphabets are allowed.'
                }));
            }
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
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const intervals = (startString, endString) => {
        const start = moment(startString, 'hh:mm a');
        const end = moment(endString, 'hh:mm a');
        start.minutes(Math.ceil(start.minutes() / 30) * 30);

        const timeSlots = [];

        while (start <= end) {
            timeSlots.push(start.format('hh:mm a'));
            start.add(30, 'minutes');
        }

        return timeSlots;
    };


    const date = new Date();
    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(date);

    // console.log(date.getDate()); //27
    // console.log("Value is",value.$d) //28
    const val = value.$d;
    const showDate = val.toDateString()
    // const month= showDate.toDateString()
    //console.log(showDate)
    // const newDate = val.getDate()


    // console.log(newDate) //28

    const formatSelectedSlot = (date, slot) => {
        const startTime = moment(slot, 'hh:mm A');
        const endTime = moment(startTime).add(30, 'minutes');

        const formattedDate = moment(date).format('Do MMMM YYYY');
        const formattedStartTime = startTime.format('h:mmA');
        const formattedEndTime = endTime.format('h:mmA');

        return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
    };

    useEffect(() => {
        const selectedDay = val.getDay();
        const selectedDate = moment(val);

        if (selectedDay === 0 || selectedDay === 6) {
            setSlots([]);
        } else if (selectedDate.isSame(date, 'day')) {
            const generatedSlots = intervals(formattedTime, '08:00 PM');
            setSlots(generatedSlots);
        } else {
            const generatedSlots = intervals('08:00 AM', '08:00 PM');
            setSlots(generatedSlots);
        }
    },[value,formattedTime]);



    const handleSlotSelection = (time) => {
        if (slots.includes(time)) {
            setSelectedSlot(time);
        }
    };
    const progress = (Object.keys(selectedAnswers).length / questionsData.length) * 100;

    return (
        <div className='w-full md:flex md:flex-col lg:flex-col xl:flex-row 2xl:flex-row justify-between mx-auto h-screen font-inter overflow-x-hidden'>
            <div className='w-full left-container flex flex-col items-start'>
                <div className='flex flex-col items-center lg:items-start w-full xl:ml-16 2xl:ml-16 md:gap-y-1 lg:gap-y-0'>
                    <h1 className='heading text-[24px] md:text-[40px] lg:text-[54px] xl:text-[50px] 2xl:text-[64px] text-center md:text-center xl:text-start md:tracking-[-2.69px] md:mb-0 w-full'>Book your <span>30-minute </span></h1>
                    <h1 className='font-medium text-[24px] md:mt-[-26px] xl:text-[50px] 2xl:text-[64px] mt-[-10px] sm:text-[28px] md:text-[40px] lg:text-[54px] xl:text-start text-center md:tracking-[-2.69px] w-full'>NexaStack demo.</h1>
                </div>
                <p className='mt-16 text-[#3E57DA] text-center xl:text-start ml-0 xl:ml-16 2xl:ml-16 tracking-[0.67px] w-full md:text-[20px] lg:text-[24px] xl:text-[24px] 2xl:text-[24px]'>WHAT TO EXPECT:</p>
                <div className='xl:ml-16 2xl:ml-16 mt-8 space-y-2 md:space-y-3 flex items-center xl:items-start flex-col w-full text-[14px] md:text-[20px] lg:text-[24px] xl:text-[23px] 2xl:text-[18px]'>
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
                <div className='flex flex-col md:flex md:flex-row mt-16 md:gap-x-12 xl:gap-x-2 2xl:gap-x-4 gap-y-5 items-center justify-center w-full md:items-start lg:ml-16 xl:ml-16 2xl:mt-20 2xl:ml-[68px] xl:justify-start xl:items-start'>
                    <img src={grdp} alt='grdp' className='w-[170px] xl:w-[170px] 2xl:w-[160px]' />
                    <img src={soc} alt='soc' className='w-[170px] xl:w-[170px] 2xl:w-[160px]' />
                    <img src={iso} alt='iso' className='w-[220px] xl:w-[200px] xl:h-[22px] 2xl:w-[220px]' />
                </div>
                <div className='flex justify-center sm:text-start mt-10 md:mt-24 w-full xl:justify-start xl:ml-16'>
                    <h3 className='text-[#333B52] text-[13px] md:text-[18.9px] 2xl:text-[18.9px] flex text-center'>Trusted by over Top AI companies of all size</h3>
                </div>
                <div className='lg:ml-14 md:mt-4 mt-10 mb-8 w-full xl:ml-5 2xl:ml-6'>
                    <div className='grid grid-cols-4 gap-x-0 sm:gap-x-10 xl:w-full xl:gap-x-0'>
                        <img src={zoom} alt='zoom' className='' />
                        <img src={reuters} alt='reuters' className='' />
                        <img src={heineken} alt='heineken' className='' />
                        <img src={reuters} alt='reuters' className='' />
                    </div>
                    <div className='grid grid-cols-4 gap-x-0 sm:gap-x-10 xl:gap-x-0'>
                        <img src={zoom} alt='zoom' className='' />
                        <img src={reuters} alt='reuters' className='' />
                        <img src={heineken} alt='heineken' className='' />
                        <img src={reuters} alt='reuters' className='' />
                    </div>
                </div>
            </div>
            <div className='right-container w-full'>
                <div className='mt-20 flex items-center justify-center xl:justify-normal xl:ml-14 w-full'>
                    <img src={logo} alt='comapny-logo' className='md:w-[200px] w-[140px] items-center' />
                </div>

                {/* Step 1 */}
                {currentStep === 1 && (
                    <div className='w-full'>
                        <div className='customise-container items-center xl:items-start flex flex-col md:mt-20 mt-6 max-w-full'>
                            <h1 className='md:text-[28px] lg:text-[32px] xl:text-[27px] flex justify-center md:justify-normal md:ml-16 xl:ml-12 w-full'>Customize your 30-Minute Demo</h1>
                            <p className='text-[#727272] ml-2 items-center justify-center md:ml-16 xl:ml-12 2xl:ml-12 flex md:items-start md:justify-normal md:text-[20px] lg:text-[24px] text-[18px] xl:text-[22px] font-normal w-full'>Setup your primary focus and customize the demo accordingly.</p>
                        </div>
                        <div className='w-full mx-auto items-center'>
                            <ProgressBar
                                bgcolor="#0066FF"
                                progress={Math.round(progress)}
                                height={9}
                            />
                        </div>
                        <div className="w-full mt-14">
                            <div key={questionsData[currentQuestionIndex].id} className="mb-6 flex flex-col items-start mx-auto">
                                <motion.div
                                    // key={id}
                                    initial="hidden"
                                    animate="visible"
                                    variants={optionVariants}
                                    className='delay-100 transition duration-150 ease-in-out'
                                >
                                    <h2 className="font-semibold mb-2 text-start ml-4 md:ml-8 xl:ml-12 text-[16px] md:text-[22px] lg:text-[28px] xl:text-[22px] 2xl:text-[22px] text-[#000000]">
                                        {questionsData[currentQuestionIndex].text} <StyledSpan>*</StyledSpan>
                                    </h2>
                                </motion.div>
                                <div className="flex flex-wrap gap-4 md:gap-6 md:gap-y-8 justify-start items-center ml-3 xl:justify-normal lg:ml-6 xl:ml-12 my-6 lg:text-[15px] max-w-full">
                                    {questionsData[currentQuestionIndex].options.map((option) => (
                                        <motion.div
                                            key={option}
                                            initial="hidden"
                                            animate="visible"
                                            variants={optionVariants}
                                            // custom={index}
                                            className='delay-100 transition duration-150 ease-in-out'
                                        >
                                            <button
                                                className={`px-4 py-2 md:px-8 md:py-3 rounded-full border font-normal text-[14px] md:ml-2 lg:ml-0 md:text-[18px] xl:text-[16px] 2xl:text-sm
                                              ${selectedAnswers[questionsData[currentQuestionIndex].id] === option ? "btn-option" :
                                                        pendingAnswer && pendingAnswer.option === option ? "btn-option" :
                                                            "bg-[#F6F6F6]"}`}
                                                onClick={() => handleAnswer(questionsData[currentQuestionIndex].id, option)}
                                                disabled={pendingAnswer !== null}
                                            >
                                                {option}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='text-white flex justify-end items-center mr-6 mt-10 md:items-center md:justify-end md:mr-20 md:mt-24 xl:mr-14'>
                            <button
                                className={`btn-next flex gap-x-2 md:gap-x-6 items-center font-normal xl:text-[16px] 2xl:text-[16px] ${currentQuestionIndex === questionsData.length - 1 && isLastQuestionAnswered ? '' : 'opacity-50 cursor-not-allowed'} font-semibold`}
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
                  <div className='flex items-center w-full flex-col md:items-start'>
                  <div className='customise-container items-start flex flex-col md:ml-10 mt-6 md:mt-20'>
                      <h1 className='md:text-[32px] flex mx-auto md:ml-0'>Your Information</h1>
                      <p className='text-[#727272] md:-ml-0 md:w-full md:text-[24px] font-normal'>Please provide your information and schedule the demo seamlessly.</p>
                  </div>
                  <div className='flex flex-col md:flex-row m-0 md:m-10 w-11/12 space-y-4 md:space-y-0 md:space-x-14 lg:space-x-16 xl:space-x-14 mt-10 2xl:gap-x-4'>
                      <div className='flex flex-col items-start w-full md:w-5/12'>
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
                      <div className='flex flex-col items-start w-full md:w-5/12'>
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
                  <div className='flex flex-col md:flex-row mt-3 md:m-10 w-11/12 space-y-4 md:space-y-0 md:space-x-14 lg:space-x-16 xl:space-x-14 2xl:gap-x-4 md:mt-0'>
                      <div className='flex flex-col items-start w-full md:w-5/12'>
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
                      <div className='flex flex-col items-start w-full md:w-5/12'>
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
                  <div className='flex flex-col w-11/12 gap-y-5 md:ml-10 md:gap-y-10 mt-5 md:mt-0'>
                      <div className='flex flex-col items-start md:w-11/12 w-full md:ml-2 xl:ml-0 lg:ml-0'>
                          <label>
                              Industry Belongs To <StyledSpan>*</StyledSpan>
                          </label>
                          <select
                              className={`scrollbar-hide p-2 md:px-3 w-full rounded-lg border mt-2 bg-white focus:outline-none text-black ${formErrors.industry ? 'border-red-500' : 'border-[#465FF166]'}`}
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                          >
                              <option value="" className='text-[#9C9AA5]'>Select your Industry type</option>
                              {IndustryList.map((ind) => (
                                  <option key={ind.value} value={ind.value}>
                                      {ind.label}
                                  </option>
                              ))}
                          </select>
                          {formErrors.industry && (
                              <p className='text-red-500 text-sm mt-1'>{formErrors.industry}</p>
                          )}
                      </div>
                      <div className='flex flex-col items-start md:w-11/12 w-full md:ml-2 xl:ml-0 lg:ml-0'>
                          <label>
                              Department / Team <StyledSpan>*</StyledSpan>
                          </label>
                          <select
                              className={`p-2 md:px-3 w-full rounded-lg border mt-2 bg-white focus:outline-none text-black ${formErrors.department ? 'border-red-500' : 'border-[#465FF166]'}`}
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                          >
                              <option value="" className='text-[#9C9AA5]'>Select your department/ team</option>
                              {dept.map((dept) => (
                                  <option key={dept.value} value={dept.value}>
                                      {dept.label}
                                  </option>
                              ))}
                          </select>
                          {formErrors.department && (
                              <p className='text-red-500 text-sm mt-1'>{formErrors.department}</p>
                          )}
                      </div>
                  </div>
                  <div className='flex justify-end items-center w-full mt-10'>
                      <button
                          className='btn-next flex gap-x-2 md:gap-x-6 items-center md:mr-16 lg:mr-32 xl:mr-16 2xl:mr-24 font-semibold'
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
                            <p className='text-[#727272] flex md:ml-12 md:w-full md:text-[24px] font-normal mx-auto'>Please pick your suitable date and time slot for the demo.</p>
                        </div>
                        <div className='flex mt-10 items-center'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="flex flex-col md:flex-row items-center justify-between w-full mx-auto ml-0 md:ml-8">
                                    {isDesktop ? (
                                        <DateCalendar
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                            disablePast
                                            // dayOfWeekFormatter={(day) => {
                                            //     const abbreviatedDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                                            //     return abbreviatedDays[day]; // Map day index (0-6) to weekday names
                                            // }}
                                            className="w-full md:max-w-lg max-w-sm"
                                            sx={{
                                                width: '500px',
                                                '& .MuiPickersCalendarHeader-label': {
                                                    fontSize: '24px',
                                                    fontWeight: 'bold !important',
                                                    textAlign: 'center',
                                                },
                                                '& .MuiDayCalendar-header': {
                                                    gap: '30px',
                                                    fontWeight: 700,
                                                },
                                                '& .MuiPickersDay-root': {
                                                    marginX: '28px',
                                                    // gap:"45px",
                                                    fontWeight: 'bold !important',
                                                    color: 'black !important',
                                                    '&:hover': {
                                                        backgroundColor: '#E6F2FF',
                                                    },
                                                },
                                                '& .MuiPickersCalendarHeader-switchViewButton': {
                                                    display: 'none',
                                                },
                                                '& .MuiDayCalendar-weekContainer': {
                                                    justifyContent: 'center',
                                                },
                                                '& .MuiPickersDay-root:not(.MuiPickersDay-weekend)': {
                                                    marginX: '10px',
                                                },
                                                '& .MuiDayCalendar-header': {
                                                    fontWeight:'bold !important',
                                                    color: 'black !important',
                                                    gap: '17px',
                                                },
                                                '& .MuiPickersCalendarHeader-label': {
                                                    fontSize: '24px',
                                                },
                                                '& .MuiPickersArrowSwitcher-root': {
                                                    marginRight: '105px'
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: '#FB3F4A !important',
                                                    color: 'white !important',
                                                    '&:hover': {
                                                        backgroundColor: '#FF3333 !important',
                                                    },
                                                },
                                            }}
                                        />


                                    ) : (
                                        <DateCalendar
                                            disablePast
                                            onChange={(newValue) => setValue(newValue)}
                                            className="w-full md:max-w-lg max-w-sm"
                                            sx={{
                                                width: '280px',
                                                height: '450px',
                                                '& .MuiPickersDay-root': {
                                                    marginX: '3px',
                                                    '&:hover': {
                                                        backgroundColor: '#E6F2FF',
                                                    },
                                                },
                                                '& .MuiPickersCalendarHeader-switchViewButton': {
                                                    display: 'none',
                                                },
                                                // '& .MuiDayCalendar-weekContainer': {
                                                //     justifyContent: 'center',
                                                // },
                                                // '& .MuiPickersDay-root:not(.MuiPickersDay-weekend)': {
                                                //     marginX: '0px',
                                                // },
                                                // "& .MuiDayCalendar-header":{
                                                //     marginRight:'10px',
                                                // },
                                                '& .MuiPickersCalendarHeader-label': {
                                                    fontSize: '20px',
                                                    width:"100%"
                                                    // marginLeft: '0px'
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: '#FB3F4A !important',
                                                    color: 'white !important',
                                                    '&:hover': {
                                                        backgroundColor: '#FF3333 !important',
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                    <div className="md:h-[400px] w-[2px] bg-gray-100 ml-12 "></div>
                                    <div className='flex flex-col items-center w-7/12'>
                                        <div className='w-full max-w-[300px] md:mb-4 flex flex-col'>
                                            <h2 className='text-[18px] md:text-2xl font-semibold text-gray-700 mb-7 mt-4 md:mt-0'>
                                                Available Time Slots
                                            </h2>
                                            <div className='overflow-hidden flex items-center mx-auto'>
                                                <div className={`${slots && slots.length > 0
                                                    ? 'h-[300px] w-[200px] overflow-y-scroll'
                                                    : 'h-[80px] w-[150px]'} 
                                                    `}>

                                                    {slots && slots.length > 0 ? (
                                                        <div className='space-y-6 p-2'>
                                                            {slots.map((time, index) => (
                                                                <button
                                                                    key={index}
                                                                    className={`w-full py-3 text-center rounded-xl border hover:bg-[#093179] hover:text-white transition-colors duration-200 ${selectedSlot === time
                                                                        ? 'bg-[#093179] text-white'
                                                                        : 'bg-white text-black'}`}
                                                                    onClick={() => handleSlotSelection(time)}
                                                                >
                                                                    {time}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className='text-center py-4 text-gray-500'>
                                                            No time slots available
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LocalizationProvider>

                        </div>
                        <div className='flex flex-col items-center md:items-start text-[18px] md:text-[16px] md:ml-12 mt-10 md:mt-24'>
                            <p className='text-[#666666]'>Demo Scheduling</p>
                            <p className='text-[#333333] font-medium md:text-[22px] text-[18px] '>
                                {selectedSlot ? formatSelectedSlot(showDate, selectedSlot) : ''}
                            </p>
                            <p className='text-[14px]'>Timezone: GMT+5:30 India/Asia</p>
                        </div>
                        <div className='text-white flex justify-center items-center mt-10 md:items-center md:justify-end md:mr-20 md:-mt-4'>
                            <button className='btn-next flex gap-x-2 md:gap-x-6 items-center font-semibold'>
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

const optionVariants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 1.2,
            delay: index * 0.15
        }
    })

};