import React from 'react'

const ProgressBar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
        maxWidth:"100%",
        height: height,
        width: "722px",
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 20
    }

    const Childdiv = {
        height: '100%',
        maxWidth:"100%",
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: "100px",
        textAlign: 'right'
    }   

    // const progresstext = {
    //     padding: 0,
    //     color: 'black',
    // }

    return (
        <div className='flex items-center md:ml-16 mt-4 w-full flex-row md:w-full xl:w-[450px] 2xl:w-full xl:ml-10 2xl:ml-8'>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                </div>
            </div>
            <p className='p-0 text-[12px] md:text-[16px] lg:text-[20px] font-normal w-11/12 mx-auto lg:w-64 xl:w-full lg:mr-4 xl:mr-0 2xl:text-[16px] text-center xl:text-start'>{`${progress}%`} completed</p>
        </div>
    )
}

export default ProgressBar;