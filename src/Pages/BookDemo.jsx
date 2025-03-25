import React from 'react'
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

const BookDemo = () => {
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
                <div className='w-full'>
                    {/* <progress value={0.5}/> */}
                    {/* Progress bar */}
                    <Progress_bar
                        bgcolor="#0066FF"
                        progress="50"
                        height={9}
                    />
                    <div className='text-white flex absolute bottom-12 right-12'>
                        <button className='btn-next flex gap-x-6 items-center font-normal'>Next Step <img src={arrow} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDemo