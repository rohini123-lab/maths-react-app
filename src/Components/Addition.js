import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GradeIcon from "@mui/icons-material/Grade";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

const Confetti = lazy(() => import('react-confetti'));

function Addition({ problems }) {
  const [userInputs, setUserInputs] = useState(
    problems.map(() => ({ userAnswer: "" }))
  );
  const [errors, setErrors] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (event, index) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      const { value } = event.target;
      const newInputs = [...userInputs];
      newInputs[index].userAnswer = value;
      setUserInputs(newInputs);
    }
  };

  const handleInputBlur = (event, index) => {
    const { top, bottom } = problems[index];
    const ans = top + bottom;
    console.log("ans", ans);
    if (ans === parseInt(userInputs[index].userAnswer)) {
      console.log("correct answer");
    } else {
      console.log("wrong answer");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", userInputs);
    }
  };

  const validateForm = () => {
    let errors = [];

    userInputs.forEach((input, index) => {
      const { userAnswer } = input;
      const { top, bottom } = problems[index];
      const expectedDifference = top + bottom;

      if (!userAnswer.trim()) {
        errors[index] = "error";
      } else if (parseInt(userAnswer) !== expectedDifference) {
        errors[index] = "incorrect";
      } else {
        errors[index] = "correct";
      }
    });

    return errors;
  };
  useEffect(() => {
    // Check if all problems are solved
    const allProblemsSolved = errors.length>=1 && errors.every((error) => {
     console.log(error)
      return error === "correct";
    });

    console.log('allProblemsSolved',allProblemsSolved)
    setShowConfetti(allProblemsSolved);
  }, [errors]);


  return (
    <>
      
      <div style={{ margin: "10px 20px 10px 10px", minWidth: "50px" }}>
        <h2>Addition</h2>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          <ArrowBackIosIcon />
          Back
        </Button>
        <hr style={{ marginTop:'20px' }} />
        <div style={{ display:'flex' }}>
         
        {errors.map((er, i) => (
          <div key={i}>{er==='correct' ? <GradeIcon variant="contained" color="info"></GradeIcon> : '' }
          </div>
        ))}
    
          {showConfetti===true && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexWrap: "wrap",marginTop:'20px' }}>
            {problems.map((pr, i) => (
              <div
                key={i}
                style={{
                  background:errors[i] === "correct" ? '#F4FFF0' : 'white' ,
                }}
                className="problem"
              >
                
               
               <div  style={{ display: "flex",justifyContent: 'space-around' }}>
               <div style={{ alignSelf: 'end' }}>+</div>
               <div>
                  <div>{pr.top}</div>
                  <div>{pr.bottom}</div>
                </div>
               </div>
                <hr />
                <TextField 
                className="text-field"
                  value={userInputs[i].userAnswer}
                  autoComplete="off" 
                  onChange={(e) => handleInputChange(e, i)}
                  onBlur={(e) => handleInputBlur(e, i)}
                  error={errors[i] === "error" || errors[i] === "incorrect" ? true :false}
                  style={{ textAlign: 'center', }}
                  variant="outlined" />
                <br />
                <div style={{ margin: "5px 0 0 0",textAlign: 'center', }}>
                  {errors[i] === "incorrect" && (
                    <CancelIcon color="error"></CancelIcon>
                  )}
                  {errors[i] === "correct" && (
                    <>
                      <CheckCircleIcon color="success"></CheckCircleIcon>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <hr style={{ margin: "20px 10px" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Addition;
