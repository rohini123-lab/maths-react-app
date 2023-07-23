import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const Home = () => {
  const [pageCount, setpageCount] = useState(5);
  const [numberRange, setnumberRange] = useState(10);
  return (
    <Container>
      <h2 style={{ margin: "10px" }}>Add and Sub two number Examples</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { my: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="max"
          label="Problems count per page "
          value={pageCount}
          onChange={(e) => {
            setpageCount(e.target.value);
          }}
          variant="outlined"
        />
        <TextField
          id="random"
          label="Max Range Number"
          style={{ marginLeft: 20 }}
          value={numberRange}
          onChange={(e) => {
            setnumberRange(e.target.value);
          }}
          variant="outlined"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to={`/addition/${numberRange}/${pageCount - 1}`}
            style={{ marginRight: 20 }}
          >
            <Button variant="contained" color="primary">
              Addition
            </Button>
          </Link>
          <span>OR</span>
          <Link
            to={`/substraction/${numberRange}/${pageCount - 1}`}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <Button variant="contained" color="secondary">
              Substraction
            </Button>
          </Link>
          <span>OR</span>
          <Link
            disabled
            to={`/substraction/${numberRange}/${pageCount - 1}`}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <Button variant="contained" disabled color="primary">
              Multification
            </Button>
          </Link>
          <span>OR</span>
          <Link
            disabled
            to={`/substraction/${numberRange}/${pageCount - 1}`}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <Button disabled variant="contained" color="secondary">
              Division
            </Button>
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default Home;
