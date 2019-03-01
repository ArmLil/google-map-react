import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LocationOn from "@material-ui/icons/LocationOn";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = {
  item: {
    borderTop: "solid 1px #757575",
    borderBottom: "solid 1px #757575",
    margin: 1.5,
    height: 50,
    overflow: "hidden"
  }
};

function ListItemComponent(props) {
  const { classes } = props;
  return (
    <ListItem className={classes.item} role={undefined} dense>
      <IconButton
        className={classes.iconButton}
        style={{ padding: 0 }}
        onClick={() => props.iconButtonClick(props.elem)}
      >
        <LocationOn />
      </IconButton>
      <ListItemText primary={props.elem.name} />
      <ListItemSecondaryAction>
        <IconButton
          className={classes.button}
          aria-label="Delete"
          onClick={() => props.onDeleteClick(props.elem, props.index)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ListItemComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  elem: PropTypes.object.isRequired,
  iconButtonClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ListItemComponent);
