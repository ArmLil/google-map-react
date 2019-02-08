import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
  root: {
    overflowY :'hidden',
		alignItems: "center",
		justifyContent: "space-between",
    top: "auto",
    bottom: 0,
    backgroundColor:'transparent',
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between",
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="default" className={classes.root}>
      <Toolbar className={classes.toolbar} >
				2019 Lili fun-box
			</Toolbar>
    </AppBar>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
