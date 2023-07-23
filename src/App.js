import "./App.css";
import "./index.css";
import { Routes, Route ,Link} from "react-router-dom";
import { Container,Button } from "@mui/material";
import { lazy, Suspense } from "react";



const Home = lazy(() => import("./Components/Home"));
const Addition = lazy(() => import("./Components/Addition"));
const Substraction = lazy(() => import("./Components/Substraction"));

function App() {


  return (
    <>
      <Container>
      <Link
            to='/'
          >
            <Button variant="contained" color="primary">
              HOME
            </Button>
          </Link>
        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/addition/:range/:questions"
              element={<Addition  />}
            />
            <Route
              path="/substraction/:range/:questions"
              element={<Substraction  />}
            />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
