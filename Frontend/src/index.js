import React from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import "./index.css";
import Index from "./routes/route";
import Drawer from "./components/drawer";
import Camera from "./components/camera";

ReactDOM.render(
  <React.StrictMode>
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Drawer />
      </Grid>
      <Grid item xs={10}>
        <Index />
      </Grid>
      <Grid item xs={12}>
        <Camera />
      </Grid>
    </Grid>
  </React.StrictMode>,
  document.getElementById("root")
);
