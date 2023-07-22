import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { lazy, Suspense } from "react";



const Home = lazy(() => import("./Components/Home"));
const Addition = lazy(() => import("./Components/Addition"));
const Substraction = lazy(() => import("./Components/Substraction"));

function App() {

  const range = 10;
  const randomNumberMax = 10;

  let addProblems = [];
  for (let i = 0; i <= range; i++) {
    addProblems.push({
      top: getRandomInt(randomNumberMax),
      bottom: getRandomInt(randomNumberMax),
    });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let subproblems = [];
  for (let i = 0; i <= range; i++) {
    let top = getRandomInt(randomNumberMax);
    let bottom = getRandomInt(randomNumberMax);

    if (bottom > top) {
      [top, bottom] = [bottom, top];
    }
    subproblems.push({ top, bottom, result: top - bottom, userInput: "" });
  }

  return (
    <>
      <Container>
    
        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/addition/:range/:problem"
              element={<Addition problems={addProblems} />}
            />
            <Route
              path="/substraction/:range/:problem"
              element={<Substraction problems={subproblems} />}
            />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
