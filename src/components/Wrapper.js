import React from 'react';

export default function Wrapper({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f0f4f8]">
            <div className="w-[402px] h-[543px] bg-[#adcffa] rounded-[30px] border-[3px] border-solid border-[#bcdafb] shadow-[0px_4px_4px_#00000040] p-4 flex flex-col justify-start gap-4">
                <div className="flex flex-col p-4 gap-7 justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
}