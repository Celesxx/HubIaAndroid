import React from "react";
import "../css/core.css";
import "../css/input.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import PieChart from "./components/pieChart";

const useStyles = makeStyles((theme) => ({
  bigpaper: {
    margin: 50,
    backgroundColor: "#252C32",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 10,
    backgroundColor: "#383F47",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <header className="body">
      <Paper className={classes.bigpaper} elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              <PieChart></PieChart>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={3}>
              xs=4
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </header>
  );
}
