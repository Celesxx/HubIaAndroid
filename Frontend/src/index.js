import React from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import "./index.css";
import Index from "./routes/route";
import Camera from "./components/camera";
import BottomNav from "./components/BottomNav";
import Container from '@material-ui/core/Container';

ReactDOM.render(
  <React.StrictMode>
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        <Index />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <Camera />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <Container>
          <BottomNav />
        </Container>
      </Grid>
    </Grid>
  </React.StrictMode>,
  document.getElementById("root")
);
