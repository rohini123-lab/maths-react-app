import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const Home = () => {
  return (
    <Container>
      {" "}
      <h2 style={{ margin: "10px" }}>Add and Sub two number Examples</h2>
      <Link to="/addition">
        <Button variant="contained" color="primary">
          Addition
        </Button>
      </Link>
      &nbsp;
      <Link to="/substraction">
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
      <TextField id="max" label="Problems count per page " variant="outlined" />
      <TextField id="random" label="Max Range Number" variant="outlined" />
    </Box>
    </Container>
  );
};

export default Home;
