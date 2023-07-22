import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const Home = () => {
  const [pageCount,setpageCount]=useState(5);
  const [numberRange,setnumberRange]=useState(10);
  return (
    <Container>
      
      <h2 style={{ margin: "10px" }}>Add and Sub two number Examples</h2>
      <Link to={`/addition/${numberRange}/${pageCount-1}`}>
        <Button variant="contained" color="primary">
          Addition
        </Button>
      </Link>
      &nbsp;
      <Link to={`/substraction/${numberRange}/${pageCount-1}`}>
        <Button variant="contained" color="primary">
          Substraction
        </Button>
      </Link>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="max" label="Problems count per page " value={pageCount} onChange={(e)=>{setpageCount(e.target.value)}} variant="outlined" />
      <TextField id="random" label="Max Range Number" value={numberRange} onChange={(e)=>{setnumberRange(e.target.value)}} variant="outlined" />
    </Box>
    </Container>
  );
};

export default Home;
