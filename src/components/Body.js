import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchBox from "../containers/SearchBox";
import MapContainer from "../containers/MapContainer";
import ListPlaces from "../containers/ListPlaces";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    top: "12vh",
    marginLeft: 30,
    marginRight: 30
  },
  paperList: {
    display: "flex",
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 180,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  paperMap: {
    position: "relative",
    margin: theme.spacing.unit,
    marginBottom: 50,
    minWidth: 180,
    height: 500
  }
});

function Body(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <SearchBox />
          <Paper className={classes.paperList}>
            <ListPlaces />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperMap}>
            <MapContainer />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Body.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Body);
