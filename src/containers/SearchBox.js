import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HighlightOff from "@material-ui/icons/HighlightOff";
import { addPlace } from "../actions";
import { setCenter } from "../actions";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing.unit,
    minWidth: 162,
    height: 46,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    paddingLeft: 8,
    paddingRight: 8,
    margin: 2,
    width: "inherit",
    minWidth: 110,
    height: 25,
    border: "solid 0.5px #e0e0e0"
  },
  inputDiv: {
    width: "95%",
    marginBottom: 2,
    marginTop: 2,
    paddingRight: 10
  },
  iconButton: {
    color: "rgba(0, 0, 0, 0.25)",
    padding: 0
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  div: {
    display: "flex",
    flexDirection: "column"
  }
});

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatted_address: "",
      notification: ""
    };
  }

  handleChange = formatted_address => {
    this.setState({ formatted_address });
  };

  handleSelect = (formatted_address, id) => {
    console.log({ id });
    if (id !== null)
      geocodeByAddress(formatted_address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          const places = this.props.getPlaces;
          if (places.filter(el => el.id === id).length > 0) {
            alert("Данное местоположение уже выбран!");
            setTimeout(() => this.setState({ notification: "" }), 3000);
          } else {
            this.setState({ formatted_address });
            this.props.addPlace(formatted_address, latLng, id);
            this.props.setCenter(latLng);
          }
        })
        .catch(error => console.error("Error", error));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <Paper className={classes.root} elevation={1}>
          <PlacesAutocomplete
            value={this.state.formatted_address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            highlightFirstSuggestion={true}
          >
            {({ getInputProps }) => (
              <div className={classes.inputDiv}>
                <input
                  placeholder="Search Google Maps"
                  {...getInputProps({
                    placeholder: "Выберите местоположение ..."
                  })}
                  className={classes.input}
                />
              </div>
            )}
          </PlacesAutocomplete>

          <Divider className={classes.divider} />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={() => this.setState({ formatted_address: "" })}
          >
            <HighlightOff />
          </IconButton>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({ getPlaces: state.getPlaces });

const mapDispatchToProps = {
  addPlace,
  setCenter
};

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchBox));
