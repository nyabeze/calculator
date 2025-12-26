import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
    let [numString,setNumString] = useState("");
    const [firstNum,setFirstNum] = useState("");
    const [secondNum,setSecondNum] = useState("");
    const [firstOp,setFirstOp] = useState("");
    const [secondOp,setSecondOp] = useState("");


    const handleClick = (num) => {
        if (num === 'C') {
            setNumString("")
            setFirstNum("")
            setSecondNum("")
            setFirstOp("")
            setSecondOp("") 
        } else {
            setNumString(prev => prev + num)
        }
    }

    const backSpace = () => {
        setNumString(prev => prev.slice(0, -1));
    } 
    
    const handleOperator = (operator) => {
        // Logic for handling operators will go here
        if (firstOp === ""){
            setFirstOp(operator)
        } else{
            setSecondOp(operator)
        }


        if (firstNum === ""){
            setFirstNum(numString);
            setNumString("");
        }else if (secondNum === ""){
            setSecondNum(numString);
            setNumString("");
        }else if (firstNum !== "" && secondNum !== ""){
            let expression = firstNum +firstOp+ secondNum;
            let answer = calculate(expression);
            setFirstNum(answer);
            setSecondNum("");
            setFirstOp(secondOp);
            setNumString(answer.toString());

        }
                                                                                                                                                                                                                                        
    }
    const calculate = (expression) => {
            let operator

            if (expression.includes('+')) operator = '+'
            else if (expression.includes('-')) operator = '-'
            else if (expression.includes('*')) operator = '*'
            else if (expression.includes('/')) operator = '/'

            const [a, b] = expression.split(operator)

            switch (operator) {
                case '+': return Number(a) + Number(b)
                case '-': return Number(a) - Number(b)
                case '*': return Number(a) * Number(b)
                case '/': return Number(b) !== 0 ? Number(a) / Number(b) : 'Error'
                default: return 'Invalid'
            }
        }

        // ✅ equals button reuses existing logic
    const handleEquals = () => {
        if (firstNum && firstOp && numString) {
            const expression = firstNum + firstOp + numString;
            const answer = calculate(expression);
            setNumString(answer.toString());
            setFirstNum("");
            setSecondNum("");
            setFirstOp("");
            setSecondOp("");
        }
    }

    
    return (
        <>
        <div className="screen">
            <p>{numString}</p>
        </div>
        <div className="buttons">
            <button className="btn" onClick={backSpace}>()</button>
            <button className="btn" onClick={() => handleClick('C')}>C</button>
            <button className="btn" onClick={backSpace}>x</button>
            <button className="btn" onClick={() => handleOperator('*')}>*</button>
            
            <button className="btn" onClick={() => handleClick('1')}>1</button>
            <button className="btn" onClick={() => handleClick('2')}>2</button>
            <button className="btn" onClick={() => handleClick('3')}>3</button>
            <button className="btn" onClick={() => handleOperator('/')}>/</button>
            <button className="btn" onClick={() => handleClick('4')}>4</button>
            <button className="btn" onClick={() => handleClick('5')}>5</button>
            <button className="btn" onClick={() => handleClick('6')}>6</button>
            <button className="btn" onClick={() => handleOperator('+')}>+</button>
            <button className="btn" onClick={() => handleClick('7')}>7</button>
            <button className="btn" onClick={() => handleClick('8')}>8</button>
            <button className="btn" onClick={() => handleClick('9')}>9</button>
            <button className="btn" onClick={() => handleOperator('-')}>-</button>
            <button className="btn zero" onClick={() => handleClick('0')}>0</button>
            
            
            
            
            <button className="btn full_width" onClick={handleEquals}>=</button>
        </div>
        </>
    )

}
export default Calculator