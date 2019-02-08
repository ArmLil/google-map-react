import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from 'react-google-autocomplete';
import { addPlace } from '../actions';
import { setCenter } from '../actions';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing.unit,
    minWidth : 169,
    paddingLeft: 10,
  },
  input: {
    paddingLeft: 8,
    margin: 2,
    width: '100%',
    minWidth: 110,
    height: 25,
    border: 'solid 0.5px #e0e0e0',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  div: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class SearchBox extends Component {
  state = {
    notification:'',
    selected: false,
  }

  handleNotification() {
    setTimeout(() => {this.setState({notification: ''})}
  , 3000)}

  handleOnPlaceSelected = (place) => {
    const places = this.props.getPlaces;
    if(place.id) {
      //check if place exists
      if(places.filter(el => el.id === place.id).length > 0){
        this.setState({notification: 'The location is already selected', selected: false})
        this.handleNotification()
      }
      else {
        this.props.addPlace(place)
        this.props.setCenter(place.geometry.location)
        this.setState({notification: ''})
        this.setState({selected:true})
        setTimeout(() => {this.setState({selected:false})}, 2000)
      }
    }
  }

  handleOnKeyPress = (evn) => {
    const evnKey = evn.key
    if (evnKey === 'Enter') evn.target.value = ''
    //this is to artificially change the order of events
    //evn is not available in setTimeout
      setTimeout(() => {
        //this part will be executed after handleOnPlaceSelected
        if (evnKey === 'Enter' && this.state.selected == false) {
          if(this.state.notification == '') this.setState({notification: 'Please, select the location!'})
          this.handleNotification()
        }
      }, 1000)
  }


	render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <p style={{color: "#ef5350", padding: 0, margin: 0}}> {this.state.notification} </p>
        <Paper className={classes.root} elevation={1}>
  	      <Autocomplete
  	          className={classes.input}
  	          onPlaceSelected={
                (place) => this.handleOnPlaceSelected(place)
              }
              onKeyPress={(evn) => this.handleOnKeyPress(evn) }
  	          types={['(regions)']}
  	      />
          <Divider className={classes.divider} />
          <IconButton className={classes.iconButton} aria-label="Search" disabled>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    )
	}}

  const mapStateToProps = state => ({
    getPlaces: state.getPlaces,
  });

  const mapDispatchToProps = {
    addPlace,
    setCenter,
  };

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnPlaceSelected:PropTypes.func,
  handleOnKeyPress:PropTypes.func,
  addPlace:PropTypes.func.isRequired,
  setCenter:PropTypes.func.isRequired,
  getPlaces:PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBox));
