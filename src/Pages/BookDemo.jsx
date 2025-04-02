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
    { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs? (you can select multiple)", options: ["On-Premises – We have enterprise-grade hardware", "On-Premises - Need hardware recommendations", "Amazon", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"], multiSelect: true },
    { id: 6, text: "What is your primary use case for NexaStack?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Others (Please Specify)"], hasOther: true },
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
const countries = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Brazil", label: "Brazil" },
    { value: "Brunei", label: "Brunei" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cabo Verde", label: "Cabo Verde" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Greece", label: "Greece" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "North Korea", label: "North Korea" },
    { value: "South Korea", label: "South Korea" },
    { value: "Kosovo", label: "Kosovo" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Laos", label: "Laos" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libya", label: "Libya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia", label: "Micronesia" },
    { value: "Moldova", label: "Moldova" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Qatar", label: "Qatar" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    {
        value: "Saint Vincent and the Grenadines",
        label: "Saint Vincent and the Grenadines",
    },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syria", label: "Syria" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-Leste", label: "Timor-Leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Vatican City", label: "Vatican City" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
];

const BookDemo = () => {
    var todayDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    // console.log(todayDate);
    const isDesktop = useMediaQuery('(min-width:768px)');
    const [value, setValue] = React.useState(dayjs(todayDate));
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [multiSelectAnswers, setMultiSelectAnswers] = useState({});
    const [otherText, setOtherText] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [pendingAnswer, setPendingAnswer] = useState(null);
    const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [showOtherInput, setShowOtherInput] = useState(false); // Multi selection ke liye
    const [savedText, setSavedText] = useState('')
    // const [otherInputValue, setOtherInputValue] = useState('');// Specify Other input value ke liye
    // const [activeOptionAnimation, setActiveOptionAnimation] = useState(false);//Animation normal
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        industry: '',
        department: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Handle selection of an answer
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
            setOtherText('');
            setSavedText('')
            setShowOtherInput(true);

            if (!answeredQuestions.includes(currentQuestionIndex)) {
                setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
            }
        } else {
            // Visual feedback for selection
            //  setActiveOptionAnimation(true);
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
                //   setActiveOptionAnimation(false);

                // Auto-advance to next question after selection (except for multi-select)
                if (currentQuestionIndex < questionsData.length - 1) {
                    setTimeout(() => {
                        setCurrentQuestionIndex(prev => prev + 1);
                    }, 100);
                } else if (currentQuestionIndex === questionsData.length - 1) {
                    setIsLastQuestionAnswered(true);
                }
            }, 100);
        }
    }, [currentQuestionIndex, answeredQuestions, multiSelectAnswers]);

    const handleOtherTextChange = (e) => {
        setOtherText(e.target.value);
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            // Add a slight delay for animation
            // setActiveOptionAnimation(true);
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev - 1);
                //  setActiveOptionAnimation(false);

                // Clear "Other" input if moving back from question 6
                if (currentQuestionIndex === 6 && showOtherInput) {
                    setShowOtherInput(false);
                }
            }, 100);
        }
    };
    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleNext = () => {
        const currentQuestion = questionsData[currentQuestionIndex];
        let canProceed = false;

        // Check if the current question has been answered
        if (currentQuestion.multiSelect) {
            // For multi-select questions
            canProceed = multiSelectAnswers[currentQuestion.id]?.length > 0;
        } else if (currentQuestion.hasOther && selectedAnswers[currentQuestion.id] === "Others (Please Specify)") {
            // For "Others" option
            canProceed = savedText.trim() !== '';
        } else {
            // Normal single-answer flow
            canProceed = !!selectedAnswers[currentQuestion.id];
        }

        if (!canProceed) {
            alert("Please answer the current question to proceed.");
            return;
        }

        // If on the last question and all are answered, move to the next step
        if (currentQuestionIndex === questionsData.length - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        } else {
            // If not the last question, find the next unanswered question
            // const nextUnansweredIndex = findNextUnansweredQuestion();
            // if (nextUnansweredIndex !== -1) {
            //     setCurrentQuestionIndex(nextUnansweredIndex);
            // } else {
            // If all questions are answered, proceed to the next question
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            // }
        }
    };

    // const findNextUnansweredQuestion = () => {
    //     for (let i = 0; i < questionsData.length; i++) {
    //         const question = questionsData[i];
    //         let isAnswered = false;

    //         if (question.multiSelect) {
    //             isAnswered = multiSelectAnswers[question.id]?.length > 0;
    //         } else if (question.hasOther && selectedAnswers[question.id] === "Others (Please Specify)") {
    //             isAnswered = otherText.trim() !== '';
    //         } else {
    //             isAnswered = !!selectedAnswers[question.id];
    //         }

    //         if (!isAnswered) {
    //             return i;
    //         }
    //     }

    //     return -1;
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clearing errors when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (name === 'firstName' || name === 'lastName') {
            const maxLength = 50;
            if (value.length >= maxLength) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: `This field should not exceed ${maxLength} characters.`
                }));
            }
            const regex = /^[a-zA-Z\s]+$/;
            if (!regex.test(value) && value.length > 0) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: 'Only English alphabets are allowed.'
                }));
            }
        }

    };

    const validateForm = () => {
        const errors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
        // const companyNameRegex = /^[a-zA-Z0-9\s]+$/;
        const maxLength = 50;

        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) {
                errors[key] = 'This field is required';
            } else if ((key === 'firstName' || key === 'lastName') && formData[key].length >= maxLength) {
                errors[key] = `This field should not exceed ${maxLength} characters.`;
            } else if ((key === 'firstName' || key === 'lastName') && !nameRegex.test(formData[key])) {
                errors[key] = 'Only alphabets are allowed';
            } else if (key === 'email' && !emailRegex.test(formData[key])) {
                errors[key] = 'Please enter a valid email address';
            }
            // else if (key === 'companyName' && !companyNameRegex.test(formData[key])) {
            //     errors[key] = 'Company name should not contain special characters';
            // }
        });


        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const handleNextStep = () => {
        if (validateForm()) {
            setCurrentStep(3);
        }
    };

    // const isMultiSelect = questionsData[currentQuestionIndex]?.multiSelect;



    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotslength, selectedSlotslength] = useState(0)

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

    // const date = new Date();
    // const formattedTime = new Intl.DateTimeFormat('en-US', {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     hour12: true
    // }).format(date);

    const val = value.$d;
    const showDate = val.toDateString();

    const formatSelectedSlot = (date, slot) => {
        const startTime = moment(slot, 'hh:mm A');
        const endTime = moment(startTime).add(30, 'minutes');

        const formattedDate = moment(date).format('Do MMMM YYYY');
        const formattedStartTime = startTime.format('h:mmA');
        const formattedEndTime = endTime.format('h:mmA');

        return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
    };

    useEffect(() => {
        const selectedDay = val.getDay(); // Get the day of the week
        const selectedDate = moment(val);
        const currentTime = moment();

        //  const startOfDay = moment().set({ hour: 8, minute: 0, second: 0 }); 
        const endOfDay = moment().set({ hour: 20, minute: 0, second: 0 }); // 8:00 PM

        const updateAvailableSlots = () => {
            let generatedSlots = [];

            if (selectedDate.isSame(currentTime, 'day')) {
               // today and after
                if (currentTime.isAfter(endOfDay)) {
                    setSlots([]);
                } else {
                    const formattedCurrentTime = currentTime
                        .add(1 - (currentTime.minute() % 30), 'minutes') 
                        .format('hh:mm A');
                    generatedSlots = intervals(formattedCurrentTime, '08:00 PM');
                }

                // Clear the selected slot if it's today and in the past
                if (
                    selectedSlot &&
                    moment(selectedSlot, 'hh:mm A').isBefore(currentTime)
                ) {
                    setSelectedSlot(null);
                }
            } else if (selectedDay === 0 || selectedDay === 6) {
                // no slots for weekends
                setSlots([]);
            } else {
                // For future days generating slots
                generatedSlots = intervals('08:00 AM', '08:00 PM');
            }

            setSlots(generatedSlots);
            selectedSlotslength(generatedSlots.length)
            // console.log(slotslength)
            // console.log(generatedSlots)
        };

        updateAvailableSlots();

        const intervalId = setInterval(() => {
            updateAvailableSlots();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [val, selectedSlot]);



    const handleSlotSelection = (time) => {
        if (slots.includes(time)) {
            setSelectedSlot(time);
        }
    };

    const progress = currentQuestionIndex > 0
        ? ((currentQuestionIndex + 1) / questionsData.length) * 100
        : 0

    const getContainerStyles = () => {
        if (!slots || slots.length === 0) {
            return {
                height: '80px',
                width: '150px',
                overflowY: 'hidden'
            };
        }

        if (slots.length <= 3) {
            return {
                height: `${Math.max(80, slots.length * 60)}px`,
                width: '180px',
                overflowY: slots.length > 1 ? 'scroll' : 'hidden'
            };
        }

        return {
            height: '300px',
            width: '200px',
            overflowY: 'scroll'
        };
    };

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

    // const handleSubmitBooking = () => {
    //     // For backend (need to see)
    //     console.log("Form Data:", formData);
    //     console.log("Selected Answers:", selectedAnswers);
    //     console.log("Multi-Select Answers:", multiSelectAnswers);
    //     console.log("Other Text:", otherText);
    //     console.log("Selected Date:", showDate);
    //     console.log("Selected Slot:", selectedSlot);

    //     alert("Demo booking submitted successfully!");
    // };

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
                <div className='lg:ml-14 md:mt-4 mt-10 mb-8 w-full xl:ml-5 2xl:ml-6 xl:px-2 2xl:px-0'>
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
                            <p className='text-[#727272] ml-0 px-1 items-center justify-center md:px-2 xl:px-4 md:ml-12 xl:ml-8 2xl:ml-8 flex md:items-start md:justify-normal md:text-[20px] lg:text-[24px] text-[18px] xl:text-[20px] font-normal w-full'>Setup your primary focus and customize the demo accordingly.</p>
                        </div>
                        <div className='w-full max-w-full px-4 md:px-8 xl:px-8 2xl:px-10'>
                            <ProgressBar
                                bgcolor="#0066FF"
                                progress={Math.round(progress)}
                                height={9}
                            />
                        </div>
                        <div className="w-full mt-14">
                            <div key={questionsData[currentQuestionIndex].id} className="mb-6 flex flex-col items-start mx-auto">
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={optionVariants}
                                    className='delay-100 transition duration-150 ease-in-out'
                                >
                                    {questionsData[currentQuestionIndex] && (
                                        <h2 className="font-semibold mb-2 text-start px-4 xl:px-2 md:ml-8 xl:ml-12 text-[16px] md:text-[22px] lg:text-[28px] xl:text-[22px] 2xl:text-[22px] text-[#000000]">
                                            {questionsData[currentQuestionIndex].text} <StyledSpan>*</StyledSpan>
                                        </h2>
                                    )}

                                </motion.div>
                                <div className="flex flex-wrap gap-4 md:gap-6 md:gap-y-8 justify-start items-center px-2 md:px-0 xl:justify-normal lg:ml-6 xl:ml-12 my-6 lg:text-[15px] max-w-full">
                                    {questionsData[currentQuestionIndex]?.options?.map((option) => {
                                        const isMultiSelect = questionsData[currentQuestionIndex]?.multiSelect || false;
                                        const currentQuestionId = questionsData[currentQuestionIndex]?.id || 0;

                                        const isSelected = isMultiSelect
                                            ? multiSelectAnswers[currentQuestionId]?.includes(option) || false
                                            : selectedAnswers[currentQuestionId] === option || false;

                                        return (
                                            <motion.div
                                                key={option || "unknown-option"}
                                                initial="hidden"
                                                animate="visible"
                                                variants={optionVariants}
                                                className='delay-100 transition duration-150 ease-in-out'
                                            >
                                                <button
                                                    className={`px-4 py-2 md:px-8 md:py-3 lg:px-7 xl:px-7 2xl:px-8 rounded-full border font-normal text-[14px] md:ml-2 lg:ml-0 md:text-[18px] xl:text-[16px] 2xl:text-sm
                    ${isSelected ? "btn-option" :
                                                            pendingAnswer?.option === option ? "btn-option" :
                                                                "bg-[#F6F6F6]"}`}
                                                    onClick={() => handleAnswer(currentQuestionId, option)}
                                                    disabled={pendingAnswer !== null && !isSelected && selectedAnswers[currentQuestionId]}
                                                >
                                                    {option || "Option not available"}
                                                </button>
                                            </motion.div>
                                        );
                                    })}

                                </div>
                                {questionsData?.[currentQuestionIndex]?.id === 6 &&
                                    selectedAnswers?.[6] === "Others (Please Specify)" && (
                                        <div className="w-full space-x-0 md:space-x-10 mb-6 px-2 md:px-14 flex flex-col md:flex-row items-center">
                                            {savedText ? (
                                                <h1 className="mx-auto px-2 text-gray-700 font-semibold break-words w-full text-start md:text-center xl:text-end max-w-lg ">
                                                    {savedText || "No additional text provided"}
                                                </h1>
                                            ) : (
                                                <input
                                                    maxLength={100}
                                                    type="text"
                                                    className="lg:w-full w-60 max-w-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0066FF]"
                                                    placeholder="Please specify your use case"
                                                    value={otherText || ""}
                                                    onChange={handleOtherTextChange}
                                                />
                                            )}
                                            {!savedText && (
                                                <button
                                                    className={`lg:mb-10 w-[200px] btn-save mt-2 px-4 ${otherText?.trim() ? '' : 'opacity-50 cursor-not-allowed'} items-center`}
                                                    onClick={() => {
                                                        if (otherText?.trim()) {
                                                            setSavedText(otherText?.trim()); // Save the text
                                                            setSelectedAnswers(prev => ({
                                                                ...prev,
                                                                6: "Others (Please Specify)",
                                                            }));
                                                            setIsNextEnabled(true)
                                                        }
                                                    }}
                                                    disabled={!otherText?.trim()}
                                                >
                                                    Save & Continue
                                                </button>
                                            )}

                                        </div>
                                    )}


                            </div>
                        </div>

                        <div className='xl:fixed xl:bottom-0 xl:right-0 flex justify-end gap-x-4 md:gap-x-2 items-center mt-10 lg:mx-2 px-2 py-2'>
                            <button
                                className={`btn-next1 flex gap-x-2 md:gap-x-6 md:w-48 w-42 text-[14px] items-center font-normal md:text-[16px] 2xl:text-[18px] ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-[#0066FF]'} font-semibold`}
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                            >
                                <img src={arrow} alt='arrow' /> Previous
                            </button>

                            <button

                                className={`  btn-next flex gap-x-2 md:gap-x-6 items-center font-semibold text-[14px] md:text-[16px] 2xl:text-[18px] ${!isNextEnabled && !isLastQuestionAnswered && !questionsData[currentQuestionIndex]?.multiSelect ? 'opacity-50 cursor-not-allowed' : ''} font-semibold`}
                                onClick={handleNext}
                                disabled={!isCurrentQuestionAnswered() && !isLastQuestionAnswered && isNextEnabled}
                            >
                                Next Step <img src={arrow} alt='arrow' />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                    <div className='flex items-center w-full flex-col md:items-start'>
                        <div className='customise-container items-start flex flex-col md:px-10 mt-6 md:mt-20'>
                            <h1 className='md:text-[32px] flex mx-auto md:ml-0'>Your Information</h1>
                            <p className='text-[#727272] w-full md:text-start md:w-full md:text-[22px] lg:text-[24px] font-normal'>Please provide your information and schedule the demo seamlessly.</p>
                        </div>
                        <div className='flex flex-col md:flex-row m-0 md:m-10 w-11/12 space-y-4 md:space-y-0 md:space-x-14 lg:space-x-16 xl:space-x-14 mt-10 2xl:gap-x-4'>
                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label>
                                    First Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    maxLength={50}
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
                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label>
                                    Last Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    maxLength={50}
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
                            <div className='flex flex-col items-start w-full md:w-1/2'>
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
                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label>
                                    Country<StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`scrollbar-hide p-2 py-3 md:px-2 w-full rounded-lg border mt-2 bg-white focus:outline-none text-black ${formErrors.country ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="" className='text-[#9C9AA5]'>Select your Country</option>
                                    {countries.map((count) => (
                                        <option key={count.value} value={count.value}>
                                            {count.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.country && (
                                    <p className='text-red-500 text-sm mt-1'>{formErrors.country}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col w-11/12 gap-y-5 md:ml-10 md:gap-y-10 mt-5 md:mt-0'>
                            <div className='flex flex-col items-start w-full md:w-full'>
                                <label>
                                    Industry Belongs To <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`scrollbar-hide p-2 py-3 md:px-2 w-full rounded-lg border mt-2 bg-white focus:outline-none text-black ${formErrors.industry ? 'border-red-500' : 'border-[#465FF166]'}`}
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
                            <div className='flex flex-col items-start w-full md:w-full'>
                                <label>
                                    Department / Team <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`p-2 py-3 md:px-2 w-full rounded-lg border mt-2 bg-white focus:outline-none text-black ${formErrors.department ? 'border-red-500' : 'border-[#465FF166]'}`}
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

                        <div className='xl:fixed xl:bottom-0 xl:right-0 text-white mb-2 flex justify-end items-center mt-10 w-full xl:mt-0 md:mt-8 gap-x-3 lg:mr-4 px-2 xl:px-0 '>
                            <button

                                className={`btn-next1 flex gap-x-2 md:gap-x-6 md:w-48 w-42 items-center text-[14px] md:text-[16px] 2xl:text-[18px] font-semibold`}
                                onClick={handlePreviousStep}
                            >
                                <img src={arrow} alt='arrow' /> Previous
                            </button>
                            <button

                                className='btn-next flex gap-x-2 md:gap-x-6 items-center font-semibold text-[14px] md:text-[16px] 2xl:text-[18px]'
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
                                <div className="flex flex-col md:flex-row items-center justify-between w-full mx-auto ml-0 xl:mr-14">
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
                                                width: '390px',
                                                '& .MuiPickersCalendarHeader-label': {
                                                    fontSize: '24px',
                                                    fontWeight: 'bold !important',
                                                },
                                                // '& .MuiDayCalendar-header': {
                                                //     fontWeight: 'bold !important', // Bold weekdays
                                                //     color: 'black !important',
                                                // },
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
                                                    fontWeight: 'bold !important',
                                                    color: 'black !important',
                                                    gap: '17px',
                                                    fontSize: '24px',
                                                },
                                                // '& .MuiPickersCalendarHeader-label': {
                                                //     fontSize: '24px',
                                                // },
                                                '& .MuiPickersArrowSwitcher-root': {
                                                    marginRight: '80px'
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
                                                    width: "100%"
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
                                    <div className="md:h-[400px] w-[2px] bg-gray-100 ml-12 md:ml-1 lg:ml-16 xl:ml-0 2xl:ml-12 "></div>
                                    <div className='flex flex-col items-center w-7/12 md:w-5/12 lg:w-6/12 xl:w-4/12 2xl:w-5/12'>
                                    {/* do changes in aove div item center if large space between calendar and slots */}
                                        <div className='w-full max-w-[300px] md:mb-4 flex flex-col'>
                                            <h2 className='text-[18px] md:text-2xl font-semibold text-gray-700 mb-7 mt-4 md:mt-0'>
                                                Available Time Slots
                                            </h2>
                                            <div className='overflow-hidden flex items-center mx-auto'>
                                                <div style={getContainerStyles()}>
                                                    {slots && slots.length > 0 ? (
                                                        <div className='space-y-6 p-2'>
                                                            {slots.map((time, index) => (
                                                                <button
                                                                    key={index}
                                                                    className={`w-full py-3 text-center rounded-xl border hover:bg-[#093179] hover:text-white transition-colors duration-200 ${selectedSlot === time
                                                                        ? 'bg-[#093179] text-white'
                                                                        : 'bg-white text-black'
                                                                        }`}
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
                        <div className='flex flex-col items-center md:items-start text-[18px] md:text-[16px] md:ml-10 mt-10 md:mt-16'>
                            <p className='text-[#666666]'>Demo Scheduling</p>
                            <p className='text-[#333333] font-medium md:text-[22px] text-[18px] '>
                                {selectedSlot ? formatSelectedSlot(showDate, selectedSlot) : ''}
                            </p>
                            <p className='text-[14px]'>Timezone: GMT+5:30 India/Asia</p>
                        </div>
                        <div className='xl:fixed xl:bottom-0 xl:right-0 text-white mb-2 flex justify-center items-center md:justify-end mt-10 md:-mt-4 gap-x-2 px-2 lg:mx-2'>
                            <button
                                className={`btn-next1 flex gap-x-2 md:gap-x-6 md:w-48 w-42 items-center text-[14px] md:text-[16px] 2xl:text-[18px] font-semibold`}
                                onClick={handlePreviousStep}
                            >
                                <img src={arrow} alt='arrow' /> Previous
                            </button>
                            <button className='btn-next flex gap-x-2 md:gap-x-6 items-center font-semibold text-[13px] md:text-[16px] 2xl:text-[18px]'>
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