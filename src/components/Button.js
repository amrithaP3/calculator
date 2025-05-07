import React from 'react';

export default function Button({ value, onClick, style }) {
    return (
        <button className={`[font-family:'Lexend_Giga-Bold',Helvetica] font-bold text-center tracking-[0] leading-[0] ${style}`} onClick={() => onClick(value)}>
            {value}
        </button>
    );
}