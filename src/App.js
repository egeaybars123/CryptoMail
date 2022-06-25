import './App.css';
import Encrypt from "./components/Encrypt";
import Decrypt from "./components/Decrypt";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid
    container
    spacing={2}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh', marginTop: 10 }}
   >
    
    <Grid item>
      <Encrypt />
    </Grid>

    <Grid item>
      <Decrypt />
    </Grid>
      
    </Grid>
  );
}

export default App;
