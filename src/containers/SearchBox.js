import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from 'react-google-autocomplete';
import {addPlace} from '../actions';
import {setCenter} from '../actions';
import ReactDOM from "react-dom";

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing.unit,
    minWidth: 169,
    paddingLeft: 10,
  },
  input: {
    paddingLeft: 8,
    margin: 2,
    width: '100%',
    minWidth: 110,
    height: 25,
    border: 'solid 0.5px #e0e0e0'
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  div: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class SearchBox extends Component {
  state = {
    notification: '',
  }

  handleOnPlaceSelected = (newPlace) => {
    const autocomplete = this.refs.autocomplete;
    const places = this.props.getPlaces;
    if (newPlace.place_id) {
      //check if place selected
      if (places.filter(el => el.id === newPlace.place_id).length > 0) {
        this.setState({notification: 'Данное местоположение уже выбран!'})
        setTimeout(() => this.setState({notification: ''}), 3000)
      } else {
        const lat = newPlace.geometry.location.lat()
        const lng = newPlace.geometry.location.lng()
        this.props.addPlace(newPlace, {lat, lng}, newPlace.place_id)
        this.props.setCenter({lat, lng})
      }
      autocomplete.refs.input.value = '';
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.div}>
        <p style={{color: "#ef5350", padding: 0,margin: 0}}>
          {this.state.notification}
        </p>
        <Paper className={classes.root} elevation={1}>
          <Autocomplete ref="autocomplete"
            className={classes.input}
            onPlaceSelected={(place) => this.handleOnPlaceSelected(place)}
            types={['(regions)']}/>
          <Divider className={classes.divider}/>
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            disabled>
            <SearchIcon/>
          </IconButton>
        </Paper>
      </div>)
  }
}

const mapStateToProps = state => ({getPlaces: state.getPlaces});

const mapDispatchToProps = {
  addPlace,
  setCenter
};

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBox));
