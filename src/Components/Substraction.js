import React, { useState, useEffect,lazy } from "react";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GradeIcon from "@mui/icons-material/Grade";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
const Confetti = lazy(() => import("react-confetti"));

function Substraction() {
  const [errors, setErrors] = useState([]);
  const [problems, setProblems] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const { range } = useParams();
  const { questions } = useParams();
  

  const [userInputs, setUserInputs] = useState(
    problems.map(() => ({ userAnswer: "" }))
  );
 
   
  useEffect(() => {
    const problems11 = [];
      const problems12 = [];
    for (let i = 0; i <= questions; i++) {
      let top = Math.floor(Math.random() * range);
      let bottom = Math.floor(Math.random() * range);

      if (bottom > top) {
        [top, bottom] = [bottom, top];
      }
      problems11.push({ top, bottom, result: top - bottom, userInput: "" });
      problems12.push({ userAnswer: "" });
    }

    setUserInputs(problems12);
      setProblems(problems11);
  }, [range, questions]);

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
    const ans = top - bottom;
    const userAnswer = parseInt(userInputs[index].userAnswer);

    if (userAnswer === ans) {
      const newErrors = [...errors];
      newErrors[index] = "correct";
      setErrors(newErrors);
    } else {
      const newErrors = [...errors];
      newErrors[index] = "incorrect";
      setErrors(newErrors);
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
      const expectedDifference = top - bottom;

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
    const allProblemsSolved =
      errors.length >= 1 &&
      errors.every((error) => {
        console.log(error);
        return error === "correct";
      });

    console.log("allProblemsSolved", allProblemsSolved);
    setShowConfetti(allProblemsSolved);
    setTimeout(()=>{
      setShowConfetti(false)
    },3000)
  }, [errors]);

  return (
    <>
      <div className="main-div">
        <h2>Subtraction</h2>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon />
          Back
        </Button>
        <hr style={{ marginTop: "20px" }} />
        <div style={{ display: "flex" }}>
          {errors.map((er, i) => (
            <div key={i}>
              {er === "correct" ? (
                <GradeIcon variant="contained" color="info"></GradeIcon>
              ) : (
                ""
              )}
            </div>
          ))}
          {showConfetti === true && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
            {problems.map((pr, i) => (
              <div
                key={i}
                style={{
                  background: errors[i] === "correct" ? "#F4FFF0" : "white",
                }}
                className="problem"
              >
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div style={{ alignSelf: "end" }}>-</div>
                  <div>
                    <div style={{textAlign:'right'}}>{pr.top}</div>
                    <div style={{textAlign:'right'}}>{pr.bottom}</div>
                  </div>
                </div>
                <hr />
                <TextField
                  className="text-field"
                  value={userInputs[i].userAnswer}
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e, i)}
                  onBlur={(e) => handleInputBlur(e, i)}
                  error={
                    errors[i] === "error" || errors[i] === "incorrect"
                      ? true
                      : false
                  }
                  variant="outlined"
                />

                <br />
                <div style={{ margin: "5px 0 0 0", textAlign: "center" }}>
                  {errors[i] === "incorrect" && (
                    <CancelIcon color="error"></CancelIcon>
                  )}
                  {/* {errors[i] === "error" && <span>Answer Please.</span>} */}
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
              color="secondary"
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

export default Substraction;
