import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {removePlace} from '../actions';
import {updatePlacesArray} from '../actions';
import {setCenter} from '../actions';
import ListItemComponent from '../components/ListItemComponent';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};
const grid = 2;
const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	// change background colour if dragging
	background: isDragging
		? '#c5cae9'
		: 'inherit',
	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver
		? '#ffebee'
		: 'inherit',
	padding: grid,
	width: 'inherit'
});

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		height: 405,
		overflowX: 'hidden',
		overflowY: 'scroll'
	}
});

class ListPlaces extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deleted: false
		}
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(this.props.getPlaces, result.source.index, result.destination.index);
		this.props.updatePlacesArray(items);
	}

	handleOnClick = (elem, index) => {
		this.props.removePlace(elem, index)
		//this part is added to avoid the delay of onclick
		this.setState({deleted: true})
		setTimeout(() => {
			this.setState({deleted: false})
		}, 200)
	}

	handleListItemClick = (elem) => {
		this.props.setCenter(elem.location)
	}

	render() {
		const {classes} = this.props;
		return (<List className={classes.root}>
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{
						(provided, snapshot) => (<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
							{
								this.props.getPlaces.map((elem, index) => {
									return (<Draggable key={elem.id} draggableId={elem.id} index={index}>
										{
											(provided, snapshot) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
												<ListItemComponent elem={elem} index={index} clickHandler={this.handleOnClick} handleListItemClick={this.handleListItemClick} key={elem.place.id}></ListItemComponent>
											</div>)
										}
									</Draggable>)
								})
							}
							{provided.placeholder}
						</div>)
					}
				</Droppable>
			</DragDropContext>
		</List>);
	}
}

const mapStateToProps = state => ({getPlaces: state.getPlaces});

const mapDispatchToProps = {
	removePlace,
	setCenter,
	updatePlacesArray
};

ListPlaces.propTypes = {
	classes: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListPlaces))
