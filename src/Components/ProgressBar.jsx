import React from 'react';

const ProgressBar = ({ bgcolor, progress, height }) => {
    const Parentdiv = {
        height: height,
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        flex: 1, // Allow it to grow and take available space
        maxWidth: '100%' // Ensure it doesn't overflow its container
    };

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: "100px",
        textAlign: 'right'
    };

    return (
        <div className='flex items-center w-full gap-4 px-4 md:px-0 md:ml-0 mt-4 xl:ml-6 2xl:ml-2'>
            <div style={Parentdiv} className="w-full max-w-full">
                <div style={Childdiv}></div>
            </div>
            <p className='text-[12px] md:text-[14px] lg:text-[20px] xl:text-[16px] 2xl:text-[16px] font-normal whitespace-nowrap'>
                {`${progress}%`} completed
            </p>
        </div>
    );
};

export default ProgressBar;