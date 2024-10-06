import React, { useEffect, useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
import TimeBar from '../TimeBar'

const Quiz = () => {
  const [index, setIndex] = useState(0)
  const [questions, setQuestions] = useState(data[index])
  const [disableClick, setDisableClick] = useState(false)
  const[showResult,setShowResult]=useState(false)
  const[resetTimer,setResetTimer]=useState(false)
  const[points,setPoints]=useState(0)
  const[quizStarted,setQuizStarted]=useState(false)

  let option1=useRef(null)
  let option2=useRef(null)
  let option3=useRef(null)
  let option4=useRef(null)

  let option_array=[option1,option2,option3,option4]


  const handleChangeQuestion=()=>{
    if(disableClick==true){
      if(index===data.length-1){
        setShowResult(true)

 
  
      }else{



        setResetTimer(true)
        setIndex(prev=>prev+1)
        setDisableClick(false)
        console.log(option_array)
        // option_array.map((li)=>{
        //   if(li.current.classList.contains('correct')){
        //     li.current.classList.remove('correct')
        //   }
        //   if(li.current.classList.contains('incorrect')){
        //     li.current.classList.remove('incorrect')
        //   }
        // })
        option_array.map((option)=>{
          option.current.classList.remove('correct')
          option.current.classList.remove('incorrect')
        })
        
  
  
      }

    }
    
  }

  const checkAns=(e,ele,ans)=>{
    console.log(ele,ans)
    if(ele==ans){
      e.target.classList.add('correct')
      setPoints(prev=>prev+1)
      setDisableClick(true)
    }else{
      e.target.classList.add('incorrect')
      setDisableClick(true)
      option_array[questions.ans-1].current.classList.add('correct')


    }

  }
  const timerCompleted=()=>{
    setIndex(prev=>prev+1)

  }
  const handleReset=()=>{
    setPoints(0)
    setIndex(0)
    setShowResult(false)
  }

  useEffect(()=>{
    setQuestions(data[index])
    setResetTimer(false)
    setDisableClick(false)

  },[index])

  return (
    <div style={{minHeight:'50vh'}} className='container'>
 
    <h1>Quiz App</h1>
      <hr />
      {
        quizStarted ? <>{
          showResult? <>
          <h2>YOU SCORED {points} OUT OF {data?.length}</h2>
          <button onClick={handleReset} >Play Again</button>
          
          </> :<>
          <h2>{index+1}.{questions.question}</h2>
          <TimeBar timerCompleted={timerCompleted} resetTimer={resetTimer}/>

        <ul>
          <li ref={option1} onClick={ disableClick? null: (e)=>checkAns(e,1,questions.ans)}>{questions.option1}</li>
          <li  ref={option2}  onClick={ disableClick? null: (e)=>checkAns(e,2,questions.ans)}>{questions.option2}</li>
          <li ref={option3}  onClick={ disableClick? null: (e)=>checkAns(e,3,questions.ans)}>{questions.option3}</li>
          <li ref={option4}  onClick={ disableClick? null: (e)=>checkAns(e,4,questions.ans)}>{questions.option4}</li>
        </ul>
        <button onClick={handleChangeQuestion}>Next</button>
        <div className="index">{index+1} of {data.length} questions</div></>
   
        }</> : <> <div style={{textAlign:'center'}}> <button style={{textAlign:'center'}} onClick={()=>setQuizStarted(true)}>Start Quiz</button> </div> </>
      }
     

   
    </div>
  )
}

export default Quiz
