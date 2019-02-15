import React from "react";
import {InfoWindow, withGoogleMap, GoogleMap, Marker, Polyline} from "react-google-maps";
import PropTypes from 'prop-types';

const MapComponent = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 55.755826, lng: 37.617299900000035}}
    center={props.center}>
  {
    props.markers.map(marker => {
      return (
        <Marker
          draggable={true}
          onDragEnd={(evn, marker) => props.onMarkerDragEnd(evn, marker)}
          onDragStart={(evn) => props.onDragStart(evn, marker)} key={marker.id}
          name={marker.name}
          position={marker.location}
          onClick={() => props.toggleInfoWindow(marker, true)}>
          {
            (marker.infoWindow) &&
            <InfoWindow onCloseClick={() =>
                props.toggleInfoWindow(marker, false)}>
                <span>{marker.name}</span>
            </InfoWindow>
          }
        </Marker>)
    })
  }
  <Polyline
    path={props.markers.map(marker => {
      return marker.location})
    }
  />
</GoogleMap>))

MapComponent.propTypes = {
  marker: PropTypes.object,
  toggleInfoWindow: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
  markers: PropTypes.array
};

export default MapComponent;
