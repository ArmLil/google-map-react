import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    display:'flex',
    alignItems: 'center',
    flexWrap: 'noWrap',
    bottom: '90vh'
  }
};

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root} >
      <AppBar className={classes.appBar} color="default" >
        <Toolbar  >
            <h1> Редактор маршрутов</h1>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
