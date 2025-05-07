import React from 'react';
import { Textfit } from 'react-textfit';

export default function Display({ value }) {
    return (
    <div className="w-[332px] h-[75px]">
        <Textfit mode="single" forceSingleModeWidth={false} max={40} className="font-mono w-full h-full bg-[#d6f8ff] rounded-2xl border-[6px] border-solid border-[#94acd1] shadow-[0px_4px_4px_#00000040] flex items-center justify-end pr-4 pl-4 ml-[-1px]">
            {value}
        </Textfit>
    </div>
    );
}