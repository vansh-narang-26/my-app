import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {

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
        <div className='flex items-center ml-8 mt-4'>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                </div>
            </div>
            <p className='p-0 text-[15px] font-normal'>{`${progress}%`} completed</p>
        </div>
    )
}

export default Progress_bar;