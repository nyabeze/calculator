import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
    let [numString,setNumString] = useState("");
    const [firstNum,setFirstNum] = useState("");
    const [secondNum,setSecondNum] = useState("");
    const [firstOp,setFirstOp] = useState("");
    const [secondOp,setSecondOp] = useState("");
    const [screenExpression,setScreenExpression] = useState("");
    const [history,setHistory] = useState("")



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
        <div className="calculator">
            <div className="screen">
                <p className="live-expression">{screenExpression}</p>
                <p className="prev-expression">{history}</p>

                <p className='evaluation'>{numString}</p>
            </div>
            <div className="buttons">
                <button className="btn" onClick={()=>{backSpace() }}>()</button>
                <button className="btn" onClick={() => {handleClick('C'),setScreenExpression(""),setHistory("")}}>C</button>
                <button className="btn" onClick={() => {backSpace,setScreenExpression(prev => prev.slice(0, -1))}}>x</button>
                <button className="btn" onClick={() => {handleOperator('*'),setScreenExpression(prev => prev + '*')}}>*</button>
                
                <button className="btn" onClick={() => {handleClick('1'),setScreenExpression(prev => prev + '1')}}>1</button>
                <button className="btn" onClick={() => {handleClick('2'),setScreenExpression(prev => prev + '2')}}>2</button>
                <button className="btn" onClick={() => {handleClick('3'),setScreenExpression(prev => prev + '3')}}>3</button>
                <button className="btn" onClick={() => {handleOperator('/'),setScreenExpression(prev => prev + '/')}}>÷</button>
                <button className="btn" onClick={() => {handleClick('4'),setScreenExpression(prev => prev + '4')}}>4</button>
                <button className="btn" onClick={() => {handleClick('5'),setScreenExpression(prev => prev + '5')}}>5</button>
                <button className="btn" onClick={() => {handleClick('6'),setScreenExpression(prev => prev + '6')}}>6</button>
                <button className="btn" onClick={() => {handleOperator('+'),setScreenExpression(prev => prev + '+')}}>+</button>
                <button className="btn" onClick={() => {handleClick('7'),setScreenExpression(prev => prev + '7')}}>7</button>
                <button className="btn" onClick={() => {handleClick('8'),setScreenExpression(prev => prev + '8')}}>8</button>
                <button className="btn" onClick={() => {handleClick('9'),setScreenExpression(prev => prev + '9')}}>9</button>
                <button className="btn" onClick={() => {handleOperator('-'),setScreenExpression(prev => prev + '-')}}>-</button>
                <button className="btn zero" onClick={() => {handleClick('0'),setScreenExpression(prev => prev + '0')}}>0</button>
                
                
                
                
                <button
                        className="btn full_width"
                        onClick={() => {
                            const expression = screenExpression
                            handleEquals()
                            setHistory(expression)
                            setScreenExpression("")
                        }}
                        >
                        =
                </button>

            </div>
        </div>
    )

}
export default Calculator