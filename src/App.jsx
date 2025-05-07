import React, { useState, useEffect } from 'react';
import Wrapper from './components/Wrapper';
import Display from './components/Display';
import Button from './components/Button';
import ButtonBox from './components/Buttonbox';
import { parse } from 'postcss';

export default function App() {
    // Define button types
    const pink = ['MRC', 'M+', 'M-', 'MC']
    const yellow = ['+', '-', 'x', '÷', '%', '(-)', '.', 'C']
    const green = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['0']
    ]
    const equals = ['=']

    // Define button color styles
    const buttonStyle = (value) => {
        if (pink.includes(value)) {
            return "text-[#e070b9] w-[67px] h-9 bg-[#fde1ff] rounded-2xl border-[3px] border-solid border-[#cdc4dd] shadow-[0px_4px_4px_#00000040]";
        } else if (yellow.includes(value)) {
            return "text-[#b79f71] text-[25px] w-[67px] h-[49px] top-0 left-0 bg-[#fafcde] rounded-2xl border-[3px] border-solid border-[#ded0c5] shadow-[0px_4px_4px_#00000040] pb-0.5";
        } else if (green.flat().includes(value)) {
            return "text-[#71b795] text-[25px] w-[67px] h-[49px] top-0 left-0 bg-[#defcea] rounded-2xl border-[3px] border-solid border-[#c4ddd3] shadow-[0px_4px_4px_#00000040]";
        } else if (equals.includes(value)) {
            return "text-[#b7719b] text-[25px] w-[162px] h-[49px] top-0 left-0 bg-[#fcdee4] rounded-2xl border-[3px] border-solid border-[#d8c4dd] shadow-[0px_4px_4px_#00000040] pb-1";
        }
    }

    // Calculator button layout
    const buttonGrid = [
        ['MRC', 'M+', 'M-', 'MC'],
        ['.', '(-)', '%', '+'],
        ['7', '8', '9', '-'],
        ['4', '5', '6', 'x'],
        ['1', '2', '3', '÷'],
        ['0', 'C', '=']
    ]

    // State to manage keyboard input
    const [keyPressed, setKeyPressed] = useState(null);

    // State to manage the display value
    const [displayValue, setDisplayValue] = useState('0');

    // State to manage memory value
    const [memoryValue, setMemoryValue] = useState(0);

    // State to manage the current operation
    const [currentOperation, setCurrentOperation] = useState(null);

    // State to manage the previous display value
    const [storedValue, setStoredValue] = useState(null);

    // State to manage the previous input
    const [previousInput, setPreviousInput] = useState(null);

    // Effect to handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key;
            setKeyPressed(key);
            console.log(key);

            // Map keyboard keys to calculator buttons
            switch (key) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '=':
                case '-':
                case '.':
                case '+':
                case '%':
                case 'x':
                    handleInput(key);
                    break;
                case '/':
                    handleInput('÷');
                    break;
                case '*':
                    handleInput('x');
                    break;
                case 'Enter':
                    handleInput('=');
                    break;
                case 'Backspace':
                    handleInput('C');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [displayValue, currentOperation, storedValue, previousInput]);

    // Logic for computing the result
    const computeResult = (prev, current, operation) => {
        switch (operation) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case 'x':
                return prev * current;
            case '÷':
                return prev / current;
            case '%':
                return prev % current;
            default:
                return current;
        }
    };

    // Logic for checking if previous input is an operator
    const isOperator = (val) => ['+', '-', 'x', '÷', '%', '='].includes(val);

    const handleInput = (value) => {
        // Handle different button functions
        switch (value) {
            case 'MC':
                // Memory clear
                setMemoryValue(0);
                console.log('Memory cleared');
                break;
            
            case 'MRC':
                // Memory recall
                setDisplayValue(memoryValue.toString());
                setPreviousInput(memoryValue.toString());
                console.log('Memory recalled: ' + memoryValue);
                break;
            
            case 'M+':
                // Memory add
                setMemoryValue(memoryValue + parseFloat(displayValue));
                console.log(parseFloat(displayValue));
                console.log('Memory added: ' + memoryValue);
                break;
            
            case 'M-':
                // Memory subtract
                setMemoryValue(memoryValue - parseFloat(displayValue));
                console.log('Memory subtracted: ' + memoryValue);
                break;
            
            case 'C':
                // Clear display
                setDisplayValue('0');
                setCurrentOperation(null);
                setStoredValue(null);
                break;
            
            // Binary operations
            case '+':
            case '-':
            case 'x':
            case '÷':
            case '%':
                if (storedValue === null) {
                    // If no stored value, set it to the current display value
                    setStoredValue(parseFloat(displayValue));
                }
                else if (currentOperation && storedValue !== null) {
                    // If current operation is not null, perform calculation
                    let result = computeResult(storedValue, parseFloat(displayValue), currentOperation);

                    // Update display and stored value
                    setDisplayValue(result.toString());
                    setStoredValue(result);
                }

                // Set current operation
                setCurrentOperation(value);
                break;
            
            // Equals operation
            case '=':
                // Perform calculation
                if (isOperator(previousInput)) {
                    // If previous input is an operator, do nothing
                    setCurrentOperation(null);
                    return;
                }

                // If current operation is not null, perform calculation
                if (currentOperation && storedValue !== null) {
                    let result = computeResult(storedValue, parseFloat(displayValue), currentOperation);

                    // Update display and stored value
                    setDisplayValue(result.toString());
                    setStoredValue(null);
                    setCurrentOperation(null);
                }

                // Set current operation to null since calculation is done
                setCurrentOperation(null);
                break;
            
            case '.':
                // Handle decimal point
                if (isOperator(previousInput)) {
                    setDisplayValue('0.');
                } else if (!displayValue.includes('.')) {
                    setDisplayValue(displayValue + '.');
                }
                break;
            
            case '(-)':
                // Handle negative sign
                if (displayValue.startsWith('-')) {
                    setDisplayValue(displayValue.slice(1));
                } else {
                    if (displayValue !== '0') {
                        setDisplayValue('-' + displayValue);
                    }
                }
                break;
            
            default:
                // Handle number input
                if (value === '0' && displayValue === '0') {
                    // Prevent leading zeros
                    return;
                }
                if (displayValue === '0' || isOperator(previousInput)) {
                    // If display is zero, replace it with the new value
                    setDisplayValue(value);
                } else {
                    setDisplayValue(displayValue + value);
                }

                break;
        }

        // Update previous input
        if (value !== 'MRC') {
            setPreviousInput(value);
        }
    }

    return (
        <Wrapper>
            <Display value={displayValue}></Display>
            <ButtonBox>
                {buttonGrid.flat().map((value) => (
                    <Button
                        key={value}
                        value={value}
                        onClick={() => handleInput(value)}
                        style={buttonStyle(value)}
                    />
                ))}
            </ButtonBox>
        </Wrapper>
    );
}

  