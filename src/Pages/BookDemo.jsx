import React, { useState, useCallback, useEffect } from 'react'
import "./BookDemo.css"
import axios from "axios";
import tick from "../assets/Ticks.svg"
import grdp from "../assets/1.svg"
import soc from "../assets/2.svg"
import iso from "../assets/3.svg"
import zoom from "../assets/zoom.svg"
import reuters from "../assets/reuters.svg"
import heineken from "../assets/heineken.svg"
import logo from "../assets/NexaStack.svg"
import arrow from "../assets/Vector.svg"
import background from "../assets/Background.jpeg"
import success from "../assets/success-demo.svg"
import "../Pages/Button.css"
import failed from "../assets/sad.png"
import { motion } from 'framer-motion';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Modal from '../Components/Modal';
import styled from "styled-components";
import { useMediaQuery } from '@mui/material';
import ProgressBar from '../Components/ProgressBar'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const StyledSpan = styled.span`
  color: red;
`;
const questionsArray = [
    { id: 1, text: "which_segment_does_your_company_belongs_to_" },
    { id: 2, text: "how_many_technical_teams_will_be_working_with_nexastack_" },
    { id: 3, text: "does_your_team_have_in_house_ai_ml_expertise__or_do_you_need_support_" },
    { id: 4, text: "do_you_have_specific_compliance_requirements__e_g___gdpr__hipaa__" },
    { id: 5, text: "where_do_you_plan_to_deploy_nexastack_for_unified_inference__and_what_are_your_infrastructure_needs" },
    { id: 6, text: "what_is_your_primary_use_case_for_nexastack_" },
    { id: 7, text: "are_there_specific_ai_models_you_plan_to_operate_using_nexastack_" }
];

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
    { id: 4, text: "Do you have specific compliance requirements (e.g., GDPR, HIPAA)?", options: ["GDPR", "HIPAA", "None", "Not Sure"] },
    { id: 5, text: "Where do you plan to deploy NexaStack for Unified Inference, and what are your infrastructure needs? (you can select multiple)", options: ["On-Premises - We have enterprise-grade hardware", "On-Premises - Need hardware recommendations", "Amazon Web Services (AWS) ", "Microsoft Azure", "Google Cloud", "Multi Cloud", "Not sure yet, need guidance"], multiSelect: true },
    { id: 6, text: "What is your primary use case for NexaStack?", options: ["Agentic AI Development & Deployment", "AI Model Inference & Optimization", "Enterprise AI Operations", "MLOps & Model Lifecycle Management", "AI-Powered Applications & Services", "Other (Please Specify)"], hasOther: true },
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
const countryTimezoneMap = {
    Afghanistan: "GMT+4:30 Asia/Kabul",
    Albania: "GMT+2:00 Europe/Tirane",
    Algeria: "GMT+1:00 Africa/Algiers",
    Andorra: "GMT+2:00 Europe/Andorra",
    Angola: "GMT+1:00 Africa/Luanda",
    "Antigua and Barbuda": "GMT-4:00 America/Antigua",
    Argentina: "GMT-3:00 America/Argentina",
    Armenia: "GMT+4:00 Asia/Yerevan",
    Australia: "GMT+10:00 Australia/Sydney",
    Austria: "GMT+2:00 Europe/Vienna",
    Azerbaijan: "GMT+4:00 Asia/Baku",
    Bahamas: "GMT-4:00 America/Nassau",
    Bahrain: "GMT+3:00 Asia/Bahrain",
    Bangladesh: "GMT+6:00 Asia/Dhaka",
    Barbados: "GMT-4:00 America/Barbados",
    Belarus: "GMT+3:00 Europe/Minsk",
    Belgium: "GMT+2:00 Europe/Brussels",
    Belize: "GMT-6:00 America/Belize",
    Benin: "GMT+1:00 Africa/Porto-Novo",
    Bhutan: "GMT+6:00 Asia/Thimphu",
    Bolivia: "GMT-4:00 America/La_Paz",
    "Bosnia and Herzegovina": "GMT+2:00 Europe/Sarajevo",
    Botswana: "GMT+2:00 Africa/Gaborone",
    Brazil: "GMT-3:00 America/Sao_Paulo",
    Brunei: "GMT+8:00 Asia/Brunei",
    Bulgaria: "GMT+3:00 Europe/Sofia",
    "Burkina Faso": "GMT+0:00 Africa/Ouagadougou",
    Burundi: "GMT+2:00 Africa/Bujumbura",
    "Cabo Verde": "GMT-1:00 Atlantic/Cape_Verde",
    Cambodia: "GMT+7:00 Asia/Phnom_Penh",
    Cameroon: "GMT+1:00 Africa/Douala",
    Canada: "GMT-4:00 America/Toronto",
    "Central African Republic": "GMT+1:00 Africa/Bangui",
    Chad: "GMT+1:00 Africa/Ndjamena",
    Chile: "GMT-4:00 America/Santiago",
    China: "GMT+8:00 Asia/Shanghai",
    Colombia: "GMT-5:00 America/Bogota",
    Comoros: "GMT+3:00 Indian/Comoro",
    Congo: "GMT+1:00 Africa/Brazzaville",
    "Costa Rica": "GMT-6:00 America/Costa_Rica",
    Croatia: "GMT+2:00 Europe/Zagreb",
    Cuba: "GMT-4:00 America/Havana",
    Cyprus: "GMT+3:00 Asia/Nicosia",
    "Czech Republic": "GMT+2:00 Europe/Prague",
    Denmark: "GMT+2:00 Europe/Copenhagen",
    Djibouti: "GMT+3:00 Africa/Djibouti",
    Dominica: "GMT-4:00 America/Dominica",
    "Dominican Republic": "GMT-4:00 America/Santo_Domingo",
    Ecuador: "GMT-5:00 America/Guayaquil",
    Egypt: "GMT+2:00 Africa/Cairo",
    "El Salvador": "GMT-6:00 America/El_Salvador",
    "Equatorial Guinea": "GMT+1:00 Africa/Malabo",
    Eritrea: "GMT+3:00 Africa/Asmara",
    Estonia: "GMT+3:00 Europe/Tallinn",
    Eswatini: "GMT+2:00 Africa/Mbabane",
    Ethiopia: "GMT+3:00 Africa/Addis_Ababa",
    Fiji: "GMT+12:00 Pacific/Fiji",
    Finland: "GMT+3:00 Europe/Helsinki",
    France: "GMT+2:00 Europe/Paris",
    Gabon: "GMT+1:00 Africa/Libreville",
    Gambia: "GMT+0:00 Africa/Banjul",
    Georgia: "GMT+4:00 Asia/Tbilisi",
    Germany: "GMT+2:00 Europe/Berlin",
    Ghana: "GMT+0:00 Africa/Accra",
    Greece: "GMT+3:00 Europe/Athens",
    Grenada: "GMT-4:00 America/Grenada",
    Guatemala: "GMT-6:00 America/Guatemala",
    Guinea: "GMT+0:00 Africa/Conakry",
    "Guinea-Bissau": "GMT+0:00 Africa/Bissau",
    Guyana: "GMT-4:00 America/Guyana",
    Haiti: "GMT-4:00 America/Port-au-Prince",
    Honduras: "GMT-6:00 America/Tegucigalpa",
    Hungary: "GMT+2:00 Europe/Budapest",
    Iceland: "GMT+0:00 Atlantic/Reykjavik",
    India: "GMT+5:30 Asia/Kolkata",
    Indonesia: "GMT+7:00 Asia/Jakarta",
    Iran: "GMT+4:30 Asia/Tehran",
    Iraq: "GMT+3:00 Asia/Baghdad",
    Ireland: "GMT+1:00 Europe/Dublin",
    Israel: "GMT+3:00 Asia/Jerusalem",
    Italy: "GMT+2:00 Europe/Rome",
    Jamaica: "GMT-5:00 America/Jamaica",
    Japan: "GMT+9:00 Asia/Tokyo",
    Jordan: "GMT+3:00 Asia/Amman",
    Kazakhstan: "GMT+6:00 Asia/Almaty",
    Kenya: "GMT+3:00 Africa/Nairobi",
    Kiribati: "GMT+14:00 Pacific/Kiritimati",
    "North Korea": "GMT+9:00 Asia/Pyongyang",
    "South Korea": "GMT+9:00 Asia/Seoul",
    Kosovo: "GMT+2:00 Europe/Belgrade",
    Kuwait: "GMT+3:00 Asia/Kuwait",
    Kyrgyzstan: "GMT+6:00 Asia/Bishkek",
    Laos: "GMT+7:00 Asia/Vientiane",
    Latvia: "GMT+3:00 Europe/Riga",
    Lebanon: "GMT+3:00 Asia/Beirut",
    Lesotho: "GMT+2:00 Africa/Maseru",
    Liberia: "GMT+0:00 Africa/Monrovia",
    Libya: "GMT+2:00 Africa/Tripoli",
    Liechtenstein: "GMT+2:00 Europe/Vaduz",
    Lithuania: "GMT+3:00 Europe/Vilnius",
    Luxembourg: "GMT+2:00 Europe/Luxembourg",
    Madagascar: "GMT+3:00 Indian/Antananarivo",
    Malawi: "GMT+2:00 Africa/Blantyre",
    Malaysia: "GMT+8:00 Asia/Kuala_Lumpur",
    Maldives: "GMT+5:00 Indian/Maldives",
    Mali: "GMT+0:00 Africa/Bamako",
    Malta: "GMT+2:00 Europe/Malta",
    "Marshall Islands": "GMT+12:00 Pacific/Majuro",
    Mauritania: "GMT+0:00 Africa/Nouakchott",
    Mauritius: "GMT+4:00 Indian/Mauritius",
    Mexico: "GMT-5:00 America/Mexico_City",
    Micronesia: "GMT+11:00 Pacific/Pohnpei",
    Moldova: "GMT+3:00 Europe/Chisinau",
    Monaco: "GMT+2:00 Europe/Monaco",
    Mongolia: "GMT+8:00 Asia/Ulaanbaatar",
    Montenegro: "GMT+2:00 Europe/Podgorica",
    Morocco: "GMT+1:00 Africa/Casablanca",
    Mozambique: "GMT+2:00 Africa/Maputo",
    Myanmar: "GMT+6:30 Asia/Yangon",
    Namibia: "GMT+2:00 Africa/Windhoek",
    Nauru: "GMT+12:00 Pacific/Nauru",
    Nepal: "GMT+5:45 Asia/Kathmandu",
    Netherlands: "GMT+2:00 Europe/Amsterdam",
    "New Zealand": "GMT+12:00 Pacific/Auckland",
    Nicaragua: "GMT-6:00 America/Managua",
    Niger: "GMT+1:00 Africa/Niamey",
    Nigeria: "GMT+1:00 Africa/Lagos",
    "North Macedonia": "GMT+2:00 Europe/Skopje",
    Norway: "GMT+2:00 Europe/Oslo",
    Oman: "GMT+4:00 Asia/Muscat",
    Pakistan: "GMT+5:00 Asia/Karachi",
    Palau: "GMT+9:00 Pacific/Palau",
    Panama: "GMT-5:00 America/Panama",
    "Papua New Guinea": "GMT+10:00 Pacific/Port_Moresby",
    Paraguay: "GMT-4:00 America/Asuncion",
    Peru: "GMT-5:00 America/Lima",
    Philippines: "GMT+8:00 Asia/Manila",
    Poland: "GMT+2:00 Europe/Warsaw",
    Portugal: "GMT+0:00 Europe/Lisbon",
    Qatar: "GMT+3:00 Asia/Qatar",
    Romania: "GMT+3:00 Europe/Bucharest",
    Russia: "GMT+3:00 Europe/Moscow",
    Rwanda: "GMT+2:00 Africa/Kigali",
    "Saint Kitts and Nevis": "GMT-4:00 America/St_Kitts",
    "Saint Lucia": "GMT-4:00 America/St_Lucia",
    "Saint Vincent and the Grenadines": "GMT-4:00 America/St_Vincent",
    Samoa: "GMT+13:00 Pacific/Apia",
    "San Marino": "GMT+2:00 Europe/San_Marino",
    "Sao Tome and Principe": "GMT+0:00 Africa/Sao_Tome",
    "Saudi Arabia": "GMT+3:00 Asia/Riyadh",
    Senegal: "GMT+0:00 Africa/Dakar",
    Serbia: "GMT+2:00 Europe/Belgrade",
    Seychelles: "GMT+4:00 Indian/Mahe",
    "Sierra Leone": "GMT+0:00 Africa/Freetown",
    Singapore: "GMT+8:00 Asia/Singapore",
    Slovakia: "GMT+2:00 Europe/Bratislava",
    Slovenia: "GMT+2:00 Europe/Ljubljana",
    "Solomon Islands": "GMT+11:00 Pacific/Guadalcanal",
    Somalia: "GMT+3:00 Africa/Mogadishu",
    "South Africa": "GMT+2:00 Africa/Johannesburg",
    "South Sudan": "GMT+3:00 Africa/Juba",
    Spain: "GMT+2:00 Europe/Madrid",
    "Sri Lanka": "GMT+5:30 Asia/Colombo",
    Sudan: "GMT+2:00 Africa/Khartoum",
    Suriname: "GMT-3:00 America/Paramaribo",
    Sweden: "GMT+2:00 Europe/Stockholm",
    Switzerland: "GMT+2:00 Europe/Zurich",
    Syria: "GMT+3:00 Asia/Damascus",
    Taiwan: "GMT+8:00 Asia/Taipei",
    Tajikistan: "GMT+5:00 Asia/Dushanbe",
    Tanzania: "GMT+3:00 Africa/Dar_es_Salaam",
    Thailand: "GMT+7:00 Asia/Bangkok",
    "Timor-Leste": "GMT+9:00 Asia/Dili",
    Togo: "GMT+0:00 Africa/Lome",
    Tonga: "GMT+13:00 Pacific/Tongatapu",
    "Trinidad and Tobago": "GMT-4:00 America/Port_of_Spain",
    Tunisia: "GMT+1:00 Africa/Tunis",
    Turkey: "GMT+3:00 Europe/Istanbul",
    Turkmenistan: "GMT+5:00 Asia/Ashgabat",
    Tuvalu: "GMT+12:00 Pacific/Funafuti",
    Uganda: "GMT+3:00 Africa/Kampala",
    Ukraine: "GMT+3:00 Europe/Kiev",
    "United Arab Emirates": "GMT+4:00 Asia/Dubai",
    "United Kingdom": "GMT+1:00 Europe/London",
    "United States": "GMT-5:00 America/New_York",
    Uruguay: "GMT-3:00 America/Montevideo",
    Uzbekistan: "GMT+5:00 Asia/Tashkent",
    Vanuatu: "GMT+11:00 Pacific/Efate",
    "Vatican City": "GMT+2:00 Europe/Vatican",
    Venezuela: "GMT-4:00 America/Caracas",
    Vietnam: "GMT+7:00 Asia/Ho_Chi_Minh",
    Yemen: "GMT+3:00 Asia/Aden",
    Zambia: "GMT+2:00 Africa/Lusaka",
    Zimbabwe: "GMT+2:00 Africa/Harare",
}

const BookDemo = () => {
    const [userTimezone, setUserTimezone] = useState("GMT+5:30 India/Asia"); // Default to Indian timezone
    const [timezoneOffset, setTimezoneOffset] = useState(0); // Difference in minutes between user timezone and IST
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
    // const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    // const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [showOtherInput, setShowOtherInput] = useState(false); // Multi selection ke liye
    // const [savedText, setSavedText] = useState('')
    // const [otherInputValue, setOtherInputValue] = useState('');// Specify Other input value ke liye
    // const [activeOptionAnimation, setActiveOptionAnimation] = useState(false);//Animation normal
    const [IsModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        industry_belongs_to: '',
        department___team: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Handling selection of an answer
    const handleAnswer = useCallback((questionId, option) => {
        const currentQuestion = questionsData.find(q => q.id === questionId);

        if (!currentQuestion) return;

        if (currentQuestion.multiSelect) {
            // Handling multi-select questions
            setMultiSelectAnswers(prev => {
                const selections = prev[questionId] || [];

                if (selections.includes(option)) {
                    // Remove the option if it's already selected
                    const updatedSelections = selections.filter(item => item !== option);

                    setSelectedAnswers((prev) => ({
                        ...prev,
                        [questionId]: updatedSelections.join(''),
                    }));
                    return { ...prev, [questionId]: updatedSelections };
                } else {
                    const updatedSelections = [...selections, option];
                    //    console.log(`Updated Selections for Question ${questionId}:`, updatedSelections);
                    setSelectedAnswers((prev) => ({
                        ...prev,
                        [questionId]: updatedSelections.join(''), // Convert array to string
                    }));
                    return { ...prev, [questionId]: updatedSelections };
                }
            });

            // Mark question as answered
            if (!answeredQuestions.includes(currentQuestionIndex)) {
                setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
            }
        }
        else if (currentQuestion.hasOther && option === "Other (Please Specify)") {
            // console.log(option)
            // console.log(otherText)
            setSelectedAnswers(prev => ({
                ...prev,
                [questionId]: option,
            }));
            setOtherText('');
            setShowOtherInput(true);


            if (!answeredQuestions.includes(currentQuestionIndex)) {
                setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
            }
        }
        else {
            setPendingAnswer({ questionId, option });

            setTimeout(() => {
                setSelectedAnswers(prev => ({
                    ...prev,
                    [questionId]: option
                }));

                if (!answeredQuestions.includes(currentQuestionIndex)) {
                    setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
                }

                setPendingAnswer(null);

                // Do not auto-advance to next question—wait for "Next Step" button
            }, 100);
        }
        // eslint-disable-next-line
    }, [currentQuestionIndex, answeredQuestions, multiSelectAnswers]);



    // const handleOtherTextChange = (e) => {
    //     setOtherText(e.target.value);
    // };
    const handleOtherTextChange = (e) => {
        const newValue = e.target.value;
        setOtherText(newValue); // Update otherText state only
        //  console.log("Updated Other Text:", newValue); // Debug the current input
    };
    const finalizeOtherText = () => {
        //   console.log(otherText)
        setSelectedAnswers((prev) => ({
            ...prev,
            6: otherText, // Push the finalized text into selectedAnswers
        }));
        //  console.log("Selected Answers Updated:", selectedAnswers);
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
        const allQuestionsAnswered = answeredQuestions.length === questionsData.length;

        if (allQuestionsAnswered && currentQuestionIndex === questionsData.length - 1) {
            if (otherText !== '') {
                finalizeOtherText()
            }
            setCurrentStep(2);
        } else if (isCurrentQuestionAnswered()) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };


    // const findNextUnansweredQuestion = () => {
    //     for (let i = 0; i < questionsData.length; i++) {
    //         const question = questionsData[i];
    //         let isAnswered = false;

    //         if (question.multiSelect) {
    //             isAnswered = multiSelectAnswers[question.id]?.length > 0;
    //         } else if (question.hasOther && selectedAnswers[question.id] === "Other (Please Specify)") {
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

        // Handle name validation
        if (name === 'firstname' || name === 'lastname') {
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

        // Set timezone when country is selected
        if (name === 'country' && value) {
            const selectedTimezone = countryTimezoneMap[value] || "GMT+5:30 India/Asia";
            setUserTimezone(selectedTimezone);

            // Calculate offset between IST and selected timezone
            calculateTimezoneOffset(selectedTimezone);
        }
    };
    const calculateTimezoneOffset = (timezoneString) => {
        // Parse the GMT offset from the timezone string (e.g., "GMT+4:30 Asia/Kabul")
        const gmtMatch = timezoneString.match(/GMT([+-])(\d+):(\d+)/);

        if (!gmtMatch) {
            setTimezoneOffset(0);
            return;
        }

        const sign = gmtMatch[1] === '+' ? 1 : -1;
        const hours = parseInt(gmtMatch[2]);
        const minutes = parseInt(gmtMatch[3]);

        // Calculate total minutes offset
        const userOffset = sign * (hours * 60 + minutes);

        // IST is GMT+5:30 = +330 minutes
        const istOffset = 330;

        // Difference between user timezone and IST
        setTimezoneOffset(userOffset - istOffset);
    };

    const validateForm = () => {
        const errors = {};
        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
        // const companyNameRegex = /^[a-zA-Z0-9\s]+$/;
        const maxLength = 50;

        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) {
                errors[key] = 'This field is required';
            } else if ((key === 'firstname' || key === 'lastname') && formData[key].length >= maxLength) {
                errors[key] = `This field should not exceed ${maxLength} characters.`;
            } else if ((key === 'firstname' || key === 'lastname') && /\s/.test(formData[key])) {
                errors[key] = 'No white spaces are allowed';
            } else if ((key === 'firstname' || key === 'lastname') && !nameRegex.test(formData[key])) {
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
    const handleNextStep = async () => {
        if (validateForm()) {
            const unifiedPayload = {
                "fields": [
                    { name: "firstname", value: formData.firstname },
                    { name: "lastname", value: formData.lastname },
                    { name: "email", value: formData.email },
                    { name: "country", value: formData.country },
                    { name: "industry_belongs_to", value: formData.industry_belongs_to },
                    { name: "department___team", value: formData.department___team },
                    ...questionsArray.map(question => ({
                        name: question.text,
                        value: selectedAnswers[question.id] || ''
                    }))
                ]
            };
            // unifiedPayload.fields.forEach(field => {
            //     console.log(`Name: ${field.name}, Value: ${field.value}, Type: ${typeof field.value}`);
            // });

            // console.log(unifiedPayload)
            // console.log(selectedAnswers)
            // console.log(formData)
            // console.log(unifiedPayload)

            // try {
            //     const response = await axios.post("https://api.hsforms.com/submissions/v3/integration/submit/242072892/2fd12ce4-8805-4a13-a47e-667d985cdbd4", unifiedPayload, {
            //         headers: {
            //             "Content-Type": "application/json",
            //         }
            //     });
            //     console.log("Success:", response.data);
            //     setCurrentStep(3);
            // } catch (error) {
            //     console.error("Error during POST request:", error);
            // }
            //    try {
            //     const response = await axios.post("http://localhost:3000/submit", unifiedPayload, {
            //         headers: {
            //             "Content-Type": "application/json",
            //         }
            //     });
            //     console.log("Success:", response.data);
            //     setCurrentStep(3);
            // } catch (error) {
            //     console.error("Error during POST request:", error);
            // }
            setCurrentStep(3);
        }
    };
    // const isMultiSelect = questionsData[currentQuestionIndex]?.multiSelect;



    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    // const [slotslength, selectedSlotslength] = useState(0)

    const intervals = (startString, endString) => {
        // These are in IST
        const istStart = moment(startString, 'hh:mm a');
        const istEnd = moment(endString, 'hh:mm a');

        istStart.minutes(Math.ceil(istStart.minutes() / 30) * 30);

        const timeSlots = [];

        while (istStart <= istEnd) {
            // Convert ist time to client local time
            const localTime = moment(istStart).add(timezoneOffset, 'minutes');

            timeSlots.push({
                istTime: istStart.format('hh:mm a'), // SOrginal ist
                localTime: localTime.format('hh:mm a') // local time of client
            });

            istStart.add(30, 'minutes');
        }

        return timeSlots;
    };

    const val = value.$d;
    const showDate = val.toDateString();

    // The dates which are selected they are formatted with these functions
    const formatSelectedSlot = (date, slot) => {
        if (!slot) return '';

        const startTimeLocal = moment(slot.localTime, 'hh:mm A');
        const endTimeLocal = moment(startTimeLocal).add(30, 'minutes');

        // const startTimeIST = moment(slot.istTime, 'hh:mm A');
        // const endTimeIST = moment(startTimeIST).add(30, 'minutes');

        const formattedDate = moment(date).format('Do MMMM YYYY');
        const formattedStartTimeLocal = startTimeLocal.format('h:mmA');
        const formattedEndTimeLocal = endTimeLocal.format('h:mmA');

        // const formattedStartTimeIST = startTimeIST.format('h:mmA');
        // const formattedEndTimeIST = endTimeIST.format('h:mmA');

        // return `${formattedDate} | ${formattedStartTimeLocal} - ${formattedEndTimeLocal} (${userTimezone})`;
        return `${formattedDate} | ${formattedStartTimeLocal} - ${formattedEndTimeLocal}`;
    };
    // const getISTTimeDisplay = (slot) => {
    //     if (!slot) return '';

    //     const startTimeIST = moment(slot.istTime, 'hh:mm A');
    //     const endTimeIST = moment(startTimeIST).add(30, 'minutes');

    //     const formattedStartTimeIST = startTimeIST.format('h:mmA');
    //     const formattedEndTimeIST = endTimeIST.format('h:mmA');

    //     return `${formattedStartTimeIST} - ${formattedEndTimeIST} (GMT+5:30 India/Asia)`;
    // };

    useEffect(() => {
        const selectedDay = val.getDay();

        // Converting selected date to Indian time
        const selectedDateLocal = moment(val);
        const selectedDateIST = moment(selectedDateLocal).subtract(timezoneOffset, 'minutes');

        // Current time (for past)
        const currentTimeIST = moment().utcOffset(330);

        // Business hours in IST (8:30 to 8:30 for Indian)
        // const istStartOfDay = moment().utcOffset(330).set({ hour: 8, minute: 0, second: 0 });
        const istEndOfDay = moment().utcOffset(330).set({ hour: 20, minute: 0, second: 0 });

        const updateAvailableSlots = () => {
            let generatedSlots = [];

            if (selectedDateIST.isSame(currentTimeIST, 'day')) {
                // Today in IST timezone
                if (currentTimeIST.isAfter(istEndOfDay)) {
                    setSlots([]);
                } else {
                    const formattedCurrentTimeIST = moment(currentTimeIST)
                        .add(1 - (currentTimeIST.minute() % 30), 'minutes')
                        .format('hh:mm A');
                    generatedSlots = intervals(formattedCurrentTimeIST, '08:00 PM');
                }

                //Clear the selected slot if it's today and in the past
                if (selectedSlot &&
                    moment(selectedSlot.istTime, 'hh:mm A').isBefore(currentTimeIST)) {
                    setSelectedSlot(null);
                }
            } else if (selectedDay === 0 || selectedDay === 6) {
                setSlots([]);
            } else {
                // For future days generating slots for full business hours
                generatedSlots = intervals('08:00 AM', '08:00 PM');
            }

            setSlots(generatedSlots);
            // selectedSlotslength(generatedSlots.length);
        };

        updateAvailableSlots();

        const intervalId = setInterval(() => {
            updateAvailableSlots();
        }, 60000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [val, selectedSlot, timezoneOffset]);



    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const progress = currentQuestionIndex > 0
        ? ((currentQuestionIndex + 1) / questionsData.length) * 100
        : 0

    const getContainerStyles = () => {
        // Check if we're on a mobile device (could use a more robust check in a real app)
        const isMobile = window.innerWidth < 768; // Common breakpoint for mobile

        if (!slots || slots.length === 0) {
            return {
                height: isMobile ? '80px' : '260px', // 80px on phone, 300px otherwise
                width: '150px',
                overflowY: 'hidden'
            };
        }

        if (slots.length <= 3) {
            return {
                // height: `${Math.max(80, slots.length * 60)}px`,
                height: isMobile ? `${Math.max(80, slots.length * 60)}px` : "260px",
                // height:"260px",
                width: '180px',
                overflowY: isMobile ? slots.length > 1 ? 'scroll' : 'hidden' : slots.length <= 1 ? 'scroll' : 'hidden'
            };
        }

        return {
            height: '260px',
            width: '180px',
            overflowY: 'scroll'
        };
    };

    const isCurrentQuestionAnswered = () => {
        const currentQuestion = questionsData?.[currentQuestionIndex];

        if (!currentQuestion) return false;

        if (currentQuestion.multiSelect) {
            return multiSelectAnswers?.[currentQuestion.id]?.length > 0;
        } else if (currentQuestion.hasOther && selectedAnswers?.[currentQuestion.id] === "Other (Please Specify)") {
            return otherText?.trim() !== "";
        } else {
            return !!selectedAnswers?.[currentQuestion.id];
        }
    };
    // useEffect(() => {
    //     setIsNextEnabled(isCurrentQuestionAnswered());
    // }, [selectedAnswers, multiSelectAnswers, otherText, currentQuestionIndex]);


    return (
        <div className='w-full md:flex md:flex-col lg:flex-col xl:flex-row 2xl:flex-row justify-between mx-auto h-screen font-inter overflow-x-hidden'>
            <div
                className={`relative w-full lg:px-4 flex-col items-start bg-cover bg-center bg-no-repeat lg:min-h-[850px] xl:min-h-[950px] hidden lg:block "}`}
            >
                <img
                    src={background}
                    alt="background"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                />

                <h1 className='heading font-work-sans-semibold mt-[66px] text-[24px] md:text-[40px] lg:text-[54px] xl:text-[44px] 2xl:text-[54px] text-center md:text-center xl:text-start md:mb-0 w-full xl:ml-28 2xl:ml-36'>
                    Book your <span>30-minute</span> <br />  NexaStack demo
                </h1>


                <p className='mt-16 text-[#3E57DA] text-center text-[14px] xl:text-start ml-0 xl:ml-28 2xl:ml-36 w-full md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[20px] font-work-sans-regular'>
                    WHAT TO EXPECT:
                </p>

                <div className='xl:ml-28 2xl:ml-36 mt-8 space-y-2 md:space-y-3 flex items-center xl:items-start flex-col w-full text-[14px] md:text-[20px] lg:text-[24px] xl:text-[23px] 2xl:text-[18px]'>
                    <div className='flex items-center gap-x-1 md:gap-x-3'>
                        <img src={tick} alt='tick' className='mb-4' />
                        <p className='text-[#333B52] tracking-[-0.08px] font-work-sans-regular'>
                            Get a personalized demo of NexaStack
                        </p>
                    </div>
                    <div className='flex items-center gap-x-1 md:gap-x-3 '>
                        <img src={tick} alt='tick' className='mb-4' />
                        <p className='text-[#333B52] tracking-[-0.08px] font-work-sans-regular'>
                            Learn about pricing for your use case
                        </p>
                    </div>
                    <div className='flex items-center gap-x-1 md:gap-x-3'>
                        <img src={tick} alt='tick' className='mb-4' />
                        <p className="text-[#333B52] tracking-[-0.08px] font-work-sans-regular">
                            Hear proven customer success stories
                        </p>
                    </div>
                </div>

                <div className='flex flex-col md:flex md:flex-row mt-16 md:gap-x-12 xl:gap-x-2 2xl:gap-x-4 gap-y-5 items-center justify-center w-full md:items-start lg:ml-16 xl:ml-28 2xl:mt-20 2xl:ml-36 xl:justify-start xl:items-start'>
                    <img src={grdp} alt='grdp' className='w-[170px] xl:w-[130px] 2xl:w-[160px]' />
                    <img src={soc} alt='soc' className='w-[170px] xl:w-[130px] 2xl:w-[160px]' />
                    <img src={iso} alt='iso' className='w-[220px] xl:w-[178px] 2xl:w-[220px]' />
                </div>
                <div className='flex justify-center sm:text-start mt-10 md:mt-24 w-full xl:justify-start xl:ml-28 2xl:ml-36'>
                    <h3 className='text-[#333B52] text-[13px] md:text-[18.9px] 2xl:text-[18.9px] flex text-center font-work-sans-semibold xl:mt-10 2xl:mt-28'>Trusted by over Top AI companies of all size</h3>
                </div>
                <div className='lg:ml-14 md:mt-4 mt-10 mb-8 w-full xl:ml-4 2xl:ml-20 xl:px-10 2xl:px-0'>
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
            <div className='right-container w-full px-4 md:px-3'>
                <div className='mt-12 lg:mt-24 flex items-center justify-center md:justify-normal md:px-12 xl:px-14 w-full'>
                    <img src={logo} alt='comapny-logo' className='md:w-[200px] w-[140px] items-center' />
                </div>

                {/* Step 1 */}
                {currentStep === 1 && (
                    <div className='w-full'>
                        <div className='customise-container items-center xl:items-start flex flex-col md:mt-16 mt-6 max-w-full'>
                            <h1 className='xl:mt-16 md:text-[32px] flex justify-center md:justify-normal md:ml-16 xl:ml-12 w-full font-work-sans-semibold text-[#213047]'>
                                Customize your 30-Minute Demo
                            </h1>
                            <p className='text-[#727272] ml-0 px-1 items-center justify-center md:px-2 xl:px-10 2xl:px-0 xl:ml-4 md:ml-12 2xl:ml-12 flex md:items-start md:justify-normal md:text-[20px] xl:text-start lg:text-[24px] text-[16px] xl:text-[20px] font-work-sans-regular w-full'>
                                Setup your primary focus and customize the demo accordingly.
                            </p>
                        </div>
                        <div className='w-full max-w-full px-4 md:px-8 xl:px-8 2xl:px-10 flex xl:mt-4 mt-10'>
                            <ProgressBar
                                bgcolor="#0066FF"
                                progress={Math.round(progress)}
                                height={9}
                            />
                        </div>
                        <div className="w-full mt-24 md:mt-14 px-4 md:px-0">
                            {currentQuestionIndex >= 0 && currentQuestionIndex < questionsData.length && (
                                <div key={questionsData?.[currentQuestionIndex]?.id} className="mb-6 flex flex-col items-start mx-auto">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={optionVariants}
                                        className="delay-100 transition duration-150 ease-in-out"
                                    >
                                        {questionsData[currentQuestionIndex] && (
                                            <h4 className="font-work-sans-semibold mb-2 text-start px-4 xl:px-2 md:ml-4 xl:ml-10 text-[16px] md:text-[22px] lg:text-[28px] xl:text-[22px] 2xl:text-[22px] text-[#000000]">
                                                {questionsData[currentQuestionIndex].text} <StyledSpan>*</StyledSpan>
                                            </h4>
                                        )}
                                    </motion.div>
                                    <div className="flex flex-wrap gap-4 md:gap-6 md:gap-y-8 justify-start items-center px-2 md:px-0 xl:justify-normal lg:ml-6 xl:ml-10 my-6 lg:text-[15px] max-w-full xl:mt-10">
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
                                                    className="delay-100 transition duration-150 ease-in-out"
                                                >
                                                    <button
                                                        className={`text-black font-work-sans-regular px-4 py-2 md:px-8 md:py-3 lg:px-7 xl:px-7 2xl:px-8 rounded-full border font-normal text-[14px] md:ml-2 lg:ml-0 md:text-[18px] xl:text-[16px] 2xl:text-[16px] ${isSelected ? "btn-option" : pendingAnswer?.option === option ? "btn-option" : "bg-[#F6F6F6]"
                                                            }`}
                                                        onClick={() => handleAnswer(currentQuestionId, option)}
                                                        disabled={pendingAnswer !== null && !isSelected && selectedAnswers[currentQuestionId]}
                                                    >
                                                        {option || "Option not available"}
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    {questionsData[currentQuestionIndex]?.id === 6 &&
                                        selectedAnswers?.[6] === "Other (Please Specify)" && (
                                            <div className="w-full space-x-0 md:space-x-10 mb-6 px-2 lg:px-6 xl:px-14 flex flex-col md:flex-row items-center">
                                                <input
                                                    maxLength={100}
                                                    type="text"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0066FF] font-work-sans-regular"
                                                    placeholder="Please specify your use case"
                                                    value={otherText || ""}
                                                    // onChange={(e) => {
                                                    //     // setOtherText(e.target.value)
                                                    //     handleOtherTextChange(e);
                                                    //     // setSelectedAnswers((prev) => ({
                                                    //     //     ...prev,
                                                    //     //     6: "Other (Please Specify)",
                                                    //     // }));
                                                    //     setIsNextEnabled(true); // Enable the "Next Step" button
                                                    // }}
                                                    onChange={handleOtherTextChange}
                                                />
                                            </div>
                                        )}
                                </div>
                            )}

                        </div>

                        <div className='2xl:fixed 2xl:bottom-24 2xl:right-0 flex justify-end gap-x-2 md:gap-x-2 items-center mt-10 md:px-4 2xl:px-7 py-2'>
                            <button
                                className={`font-work-sans-semibold btn-next1 flex gap-x-2 md:gap-x-6 text-[12px] items-center md:text-[16px] 2xl:text-[18px] ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-[#0066FF]'} font-semibold`}
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                            >
                                <img src={arrow} alt='arrow' className='w-12 md:w-14' /> Previous
                            </button>
                            <button
                                className={`font-work-sans-semibold btn-next flex gap-x-2 md:gap-x-6 items-center text-[12px] md:text-[16px] 2xl:text-[18px] ${!isCurrentQuestionAnswered() ? "opacity-50 cursor-not-allowed" : ""
                                    } font-semibold`}
                                onClick={handleNext}
                            // disabled={!isCurrentQuestionAnswered()}
                            >
                                Next Step <img src={arrow} alt="arrow" className='w-12 md:w-14' />
                            </button>

                        </div>
                    </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                    <div className='flex items-center w-full flex-col md:items-start md:px-2'>
                        <div className='customise-container items-start flex flex-col md:px-10 mt-6 md:mt-28'>
                            <h1 className='md:text-[32px] flex mx-auto md:ml-0 text-[#213047]'>
                                Your Information
                            </h1>
                            <p className='text-[#727272] w-full md:text-start md:w-full md:text-[22px] lg:text-[24px] xl:text-[20px] text-[16px]'>
                                Please provide your information and schedule the demo seamlessly.
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row m-0 md:m-10 w-11/12 space-y-4 md:space-y-0 md:space-x-14 lg:space-x-16 xl:space-x-14 mt-16 md:mt-10 2xl:gap-x-4'>
                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label className="font-work-sans-regular text-[#000000] md:text-[20px] lg:text-[22px] xl:text-[16px]">
                                    First Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    maxLength={50}
                                    className={`text-black placeholder-[#000000] py-2 px-3 md:p-4 rounded-lg border w-full mt-2 focus:outline-none font-work-sans-regular md:text-[16px] text-[14px] ${formErrors.firstname ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your First Name"
                                />
                                {formErrors.firstname && (
                                    <p className='text-red-500 text-[13px] xl:text-[15px] font-work-sans-regular'>{formErrors.firstname}</p>
                                )}
                            </div>

                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label className="font-work-sans-regular text-[#000000] md:text-[20px] lg:text-[22px] xl:text-[16px]">
                                    Last Name <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    maxLength={50}
                                    className={`text-black  placeholder-[#000000] py-2 px-3 md:p-4 rounded-lg border w-full mt-2 focus:outline-none font-work-sans-regular md:text-[16px] text-[14px] ${formErrors.lastname ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your Last Name"
                                />
                                {formErrors.lastname && (
                                    <p className='text-red-500 text-[13px] xl:text-[15px] font-work-sans-regular'>{formErrors.lastname}</p>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row mt-5 md:m-10 w-11/12 space-y-4 md:space-y-0 md:space-x-14 lg:space-x-16 xl:space-x-14 2xl:gap-x-4 md:mt-0'>
                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label className="font-work-sans-regular text-[#000000] md:text-[20px] lg:text-[22px] xl:text-[16px]">
                                    Business Email ID <StyledSpan>*</StyledSpan>
                                </label>
                                <input
                                    className={`text-black placeholder-[#000000] py-2 px-3 md:p-4 rounded-lg border w-full mt-2 focus:outline-none font-work-sans-regular md:text-[16px] text-[14px] ${formErrors.email ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder="Please enter your email ID"
                                />
                                {formErrors.email && (
                                    <p className='text-red-500 text-[13px] xl:text-[15px] font-work-sans-regular'>{formErrors.email}</p>
                                )}
                            </div>

                            <div className='flex flex-col items-start w-full md:w-1/2'>
                                <label className="font-work-sans-regular text-[#000000] md:text-[20px] lg:text-[22px] xl:text-[16px]">
                                    Country <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`scrollbar-hide p-1 py-3 md:px-2 md:py-4 w-full rounded-lg border mt-2 bg-white focus:outline-none text-[#000000] font-work-sans-regular md:text-[16px] text-[14px] ${formErrors.country ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="" className='text-[#000000]'>Select your Country</option>
                                    {countries.map((count) => (
                                        <option key={count.value} value={count.value}>
                                            {count.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.country && (
                                    <p className='text-red-500 text-[13px] xl:text-[15px] font-work-sans-regular'>{formErrors.country}</p>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col w-11/12 gap-y-5 md:ml-10 md:gap-y-10 mt-5 md:mt-0'>
                            <div className='flex flex-col items-start w-full md:w-full'>
                                <label className="font-work-sans-regular text-[#000000] md:text-[20px] lg:text-[22px] xl:text-[16px]">
                                    Industry Belongs To <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`scrollbar-hide p-1 py-3 md:px-2 md:py-5 w-full rounded-lg border mt-2 bg-white focus:outline-none text-[#000000] font-work-sans-regular md:text-[16px] text-[14px] ${formErrors.industry_belongs_to ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    name="industry_belongs_to"
                                    value={formData.industry_belongs_to}
                                    onChange={handleInputChange}
                                >
                                    <option value="" className='text-[#000000]'>Select your Industry type</option>
                                    {IndustryList.map((ind) => (
                                        <option key={ind.value} value={ind.value}>
                                            {ind.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.industry_belongs_to && (
                                    <p className='text-red-500 text-[13px] xl:text-[15px] font-work-sans-regular'>{formErrors.industry_belongs_to}</p>
                                )}
                            </div>

                            <div className='flex flex-col items-start w-full md:w-full'>
                                <label className="font-work-sans-regular text-[#000000] md:text-[20px] lg:text-[22px] xl:text-[16px]">
                                    Department / Team <StyledSpan>*</StyledSpan>
                                </label>
                                <select
                                    className={`p-1 py-3 md:px-2 md:py-5 w-full rounded-lg border mt-2 bg-white focus:outline-none text-black font-work-sans-regular md:text-[16px] text-[14px] ${formErrors.department___team ? 'border-red-500' : 'border-[#465FF166]'}`}
                                    name="department___team"
                                    value={formData.department___team}
                                    onChange={handleInputChange}
                                >
                                    <option value="" className='text-black'>Select your department/ team</option>
                                    {dept.map((dept) => (
                                        <option key={dept.value} value={dept.value} className='text-black'>
                                            {dept.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.department___team && (
                                    <p className='text-red-500 text-[13px] xl:text-[15px] font-work-sans-regular'>{formErrors.department___team}</p>
                                )}
                            </div>
                        </div>


                        <div className={`text-white mb-2 flex md:justify-end md:items-center justify-center items-center mt-16 w-full md:mt-8 gap-x-2 lg:mr-4 lg:px-9 xl:px-2 2xl:px-8 md:px-6 px-1 xl:mt-10 2xl:mt-32`}>

                            <button
                                className={`btn-next1 flex gap-x-2 md:gap-x-6 items-center text-[12px] md:text-[16px] 2xl:text-[18px] font-work-sans-semibold font-semibold`}
                                onClick={handlePreviousStep}
                            >
                                <img src={arrow} alt='arrow' className='w-12 md:w-14' /> Previous
                            </button>

                            <button
                                className='btn-next flex gap-x-2 md:gap-x-6 items-center font-work-sans-semibold text-[12px] md:text-[16px] 2xl:text-[18px] font-semibold'
                                onClick={handleNextStep}
                            >
                                Next Step <img src={arrow} alt='arrow' className='w-12 md:w-14' />
                            </button>
                        </div>

                    </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                    <div className='w-full'>
                        <div className='customise-container items-start flex flex-col mt-6 md:mt-24'>
                            <h1 className='md:text-[32px] flex mx-auto md:ml-10 2xl:ml-[36px] font-work-sans-semibold text-[#213047]'>
                                Book Demo
                            </h1>
                            <p className='text-[#727272] flex md:ml-10 2xl:ml-[36px] md:w-full md:text-[24px] font-work-sans-regular font-normal mx-auto text-[16px]'>
                                Please pick your suitable date and time slot for the demo.
                            </p>
                        </div>

                        <div className='flex mt-10 items-center w-full'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className={`flex flex-col md:flex-row items-center justify-between w-full sm:ml-4 md:ml-0 lg:ml-7 xl:ml-7 2xl:px-0 2xl:ml-8 ml-0}`}>
                                    {isDesktop ? (
                                        <DateCalendar
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                            disablePast
                                            dayOfWeekFormatter={(date) => {
                                                // Format the date using Day.js adapter
                                                return date.format('ddd'); // 'dd' gives the first two letters of the weekday (e.g., 'Mo', 'Tu')
                                            }}
                                            className="w-full"
                                            sx={{
                                                width: {
                                                    sm: '450px', // For tablets
                                                    md: '473px',
                                                    xl: '603px',
                                                    // xl: '420px', // For desktops
                                                    '2xl': '800px',
                                                },
                                                height: "650px",
                                                '& .MuiPickersCalendarHeader-root': {
                                                    paddingLeft: {
                                                        xs: '9px',
                                                        md: '10px',
                                                        '@media (min-width: 1536px)': { paddingLeft: '20px' },
                                                    },
                                                },
                                                '& .MuiPickersCalendarHeader-label': {
                                                    color: "#000000 !important",
                                                    paddingRight: "20px",
                                                    fontSize: '24px !important',
                                                    fontWeight: 'bold !important',
                                                },
                                                '& .MuiTypography-root.MuiTypography-caption.MuiDayCalendar-weekDayLabel': {
                                                    //for weekdays mond,tu
                                                    paddingX: "31px",
                                                    color: '#333333 !important',
                                                    fontSize: '16px !important',
                                                    fontWeight: "600 !important",
                                                },
                                                '& .MuiDayCalendar-header': {
                                                    marginX: "6px",
                                                    fontWeight: 'bold !important',
                                                    color: 'black !important',
                                                    fontSize: '30px !important',
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                                    // textAlign: 'center',
                                                },
                                                '& .MuiDayCalendar-weekContainer': {
                                                    paddingY: "2px",
                                                    display: 'grid !important',
                                                    gridTemplateColumns: 'repeat(7, 1fr) !important',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                },
                                                '& .MuiPickersDay-root': {
                                                    // paddingY:"17px",
                                                    fontSize: '18px',
                                                    fontWeight: '!important',
                                                    color: '#666666 !important', // (for dates color)
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    '&:hover': {
                                                        backgroundColor: '#E6F2FF',
                                                    },
                                                },
                                                '& .MuiPickersCalendarHeader-switchViewButton': {
                                                    display: 'none',
                                                },
                                                '& .MuiPickersDay-root:not(.MuiPickersDay-weekend)': {
                                                    marginX: '16px',
                                                    marginY: '2px'
                                                },
                                                '& .MuiPickersArrowSwitcher-root': {
                                                    marginRight: '110px',
                                                    '@media (max-width: 768px)': { // Adjust this width for tablet breakpoints
                                                        marginRight: "98px", // Reduced margin for tablet view
                                                    },
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: '#FB3F4A !important',
                                                    color: 'white !important',
                                                    '&:hover': {
                                                        backgroundColor: '#FF3333 !important',
                                                    },
                                                },
                                            }
                                            }
                                        />


                                    ) : (
                                        <DateCalendar
                                            disablePast
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                            className="w-full"
                                            sx={{
                                                width: '280px',
                                                height: '450px',
                                                '& .MuiPickersDay-root': {
                                                    marginX: '3px',
                                                    fontSize: "12px",
                                                    color: '#666666 !important',
                                                    fontWeight: '700 !important',
                                                    '&:hover': {
                                                        backgroundColor: '#E6F2FF',
                                                    },
                                                },
                                                '& .MuiPickersCalendarHeader-switchViewButton': {
                                                    display: 'none',
                                                },
                                                '& .MuiDayCalendar-header': {
                                                    fontWeight: 'bold !important',
                                                    color: '#666666 !important',
                                                },
                                                '& .MuiTypography-root.MuiTypography-caption.MuiDayCalendar-weekDayLabel': {
                                                    // s,m ,t 
                                                    color: '#333333 !important',
                                                    fontSize: '12px !important',
                                                    fontWeight: "700 !important",
                                                },
                                                '& .MuiPickersCalendarHeader-label': {
                                                    //month names
                                                    color: "#000000 !important",
                                                    fontSize: '20px !important',
                                                    fontWeight: 'bold !important',
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
                                    <div className="md:h-[280px] w-[2px] bg-gray-100 ml-12 md:ml-1 lg:ml-16 xl:ml-2 2xl:ml-0 xl:mx-3 2xl:mx-0"></div>
                                    <div className='flex flex-col items-center justify-start w-11/12 md:w-4/12 lg:w-6/12 xl:w-4/12 2xl:w-5/12'>
                                        <h2 className='text-[18px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-work-sans-semibold text-[#000000] mb-4 md:mb-4 md:mt-0 font-semibold'>
                                            Available Time Slots
                                        </h2>
                                        <div className='w-full max-w-[300px] flex flex-col mt-2'>
                                            <div className='overflow-auto flex items-start justify-center  mx-auto' >
                                                <div style={getContainerStyles()}>
                                                    {slots && slots.length > 0 ? (
                                                        <div className='space-y-4 md:space-y-6 p-2'>
                                                            {slots.map((time, index) => (
                                                                <button
                                                                    key={index}
                                                                    className={`font-work-sans-regular w-full py-2 md:py-3 text-center rounded-xl border hover:bg-[#093179] hover:text-white transition-colors duration-200 ${selectedSlot && selectedSlot.istTime === time.istTime
                                                                        ? 'bg-[#093179] text-white'
                                                                        : 'bg-white text-black'
                                                                        }`}
                                                                    onClick={() => handleSlotSelection(time)}
                                                                >
                                                                    {time.localTime}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className='text-center py-4 text-gray-500 w-full'>
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
                            <p className='text-[#666666] text-[14px] font-work-sans-regular -mb-1 mt-4'>Demo Scheduling</p>
                            <p className='text-[#333333] font-medium md:text-[22px] text-[18px] font-work-sans-regular -mb-1'>
                                {slots.length > 0
                                    ? selectedSlot
                                        ? formatSelectedSlot(showDate, selectedSlot)
                                        : 'No slot selected'
                                    : ''}
                            </p>

                            {/* {selectedSlot && (
                                <p className='text-[#333333] font-medium md:text-[16px] text-[14px] mt-1'>
                                    Indian time: {getISTTimeDisplay(selectedSlot)}
                                </p>
                            )} */}
                            <p className='text-[14px] md:text-[16px] text-[#333333] font-work-sans-regular -mb-3'>Timezone: {userTimezone}</p>
                        </div>
                        {/* <div className='text-white mb-2 flex justify-end items-center mt-10 w-full xl:mt-10 md:mt-8 gap-x-2 lg:mr-4 lg:px-9 xl:px-2 2xl:px-8 md:px-6 px-1 2xl:mt-10'> */}
                        <div className='text-white mb-2 flex justify-center items-center md:justify-end mt-10 md:-mt-4 gap-x-2 2xl:px-16 2xl:mr-0 2xl:mt-10 xl:px-4 xl:mt-14 xl:mr-0 lg:px-16 lg:mr-0 md:px-4'>
                            <button
                                className={`btn-next1 flex gap-x-2 md:gap-x-6 items-center text-[12px] md:text-[16px] 2xl:text-[18px] font-semibold`}
                                onClick={handlePreviousStep}
                            >
                                <img src={arrow} alt='arrow' className='w-12 md:w-14' /> Previous
                            </button>
                            <button className='btn-next flex gap-x-2 md:gap-x-6 items-center font-semibold text-[12px] md:text-[16px] 2xl:text-[18px]'
                                onClick={() => setIsModalOpen(true)}
                            >
                                Book Demo <img src={arrow} alt='arrow' className='w-12 md:w-14' />
                            </button>

                            {slots.length > 0 ? (
                                <Modal isOpen={IsModalOpen} onClose={() => setIsModalOpen(false)} slots={slots}>
                                    <div className="flex flex-col items-center text-center p-6" onClick={(e) => e.stopPropagation()}>
                                        <img src={success} alt="Success" className="mb-4 w-32 md:w-40 lg:w-80" />
                                        <h2 className="text-[16px] md:text-[20px] font-work-sans-semibold -mb-1 md:-mb-2">
                                            Congrats! Your Demo has been booked
                                        </h2>
                                        <p className="text-[16px] md:text-[20px] text-gray-600 font-work-sans-regular -mb-4">
                                            We will reach out to you soon!
                                        </p>
                                    </div>
                                </Modal>
                            ) : (
                                <Modal isOpen={IsModalOpen} onClose={() => setIsModalOpen(false)}>
                                    <div className="flex flex-col items-center text-center p-6" onClick={(e) => e.stopPropagation()}>
                                        <img src={failed} alt="Error" className="mb-4 w-32 md:w-40 lg:w-80" />
                                        <h2 className="text-[16px] md:text-[20px] font-work-sans-semibold -mb-1  md:-mb-2">
                                            No Slots Available
                                        </h2>
                                        <p className="text-[16px] md:text-[20px] text-gray-600 font-work-sans-regular -mb-4">
                                            We're sorry, but there are no slots available at the moment.
                                        </p>
                                    </div>
                                </Modal>
                            )}

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