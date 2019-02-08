import React from "react"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Geocode from "react-geocode";
import { updatePlace } from '../actions';
import { setCenter } from '../actions';
import MapComponent from '../components/MapComponent'

Geocode.setApiKey( "AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0" );
Geocode.enableDebug();

class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: false,
      dragStartMarker: '',
      dragEndMarker: {},
    }
  }

  handleGeocode = (lat, lng) => {
    Geocode.fromLatLng(lat, lng)
    .then(response => {
      this.setState(
        {dragEndMarker:{place:response.results[0]},
          error: false});
      this.props.updatePlace(this.state.dragStartMarker, this.state.dragEndMarker)
    },
    error => {
      this.setState({error: true})
      alert('Please, select anouther location!')
      console.error('GeocodeError', error);
    })
  }

  toggleInfoWindow = (marker, boolenOpen) => {
    const newMarker = Object.assign({}, marker , {infoWindow: boolenOpen})
    this.props.updatePlace(marker, newMarker)
    // if(boolenOpen) this.props.setCenter(marker.location)
  }

  handleDragStart = (evn, marker) => {
    this.setState({dragStartMarker: marker})
  }

  handleDragEnd = (evn) => {
    this.handleGeocode(evn.latLng.lat(),evn.latLng.lng())
  }

  render() {
    return (
      <MapComponent
        onMarkerDragEnd={this.handleDragEnd}
        onDragStart={this.handleDragStart}
        markers={this.props.getPlaces}
        center = {this.props.getCenter}
        toggleInfoWindow={this.toggleInfoWindow}
        loadingElement={<div style={{height: '100%'}}/>}
        containerElement={<div style={{height: 'inherit'}} />}
        mapElement={<div style={{height: `100%`}}/>}
      >
			</MapComponent>
    )
  }
}

const mapStateToProps = state => ({
  getPlaces: state.getPlaces,
  getCenter: state.getCenter,
});

const mapDispatchToProps = {
  updatePlace,
  setCenter,
};

MapContainer.propTypes = {
  toggleInfoWindow:PropTypes.func,
  handleDragStart:PropTypes.func,
  handleDragEnd:PropTypes.func,
  getPlaces:PropTypes.array.isRequired,
  getCenter:PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
