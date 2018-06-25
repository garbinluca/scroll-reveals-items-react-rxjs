import React, { Component } from 'react';

import PropTypes from 'prop-types';

import scrollViewRx from '../ScrollView/ScrollViewRx.js';

class ScrollView extends Component {

	scrollObserver = undefined;

	constructor(props) {

		super(props);
		this.props = props;

		this.state = {
			viewed: false
		};

		this.handleScroll = this.handleScroll.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.addToRef = this.addToRef.bind(this);

	}

	componentDidMount() {

		if (this.scrollObserver !== undefined) return;

		this.getBoundingClientRect();
		this.scrollObserver = scrollViewRx.listenScroll(this.handleScroll);
		this.resizeObserver = scrollViewRx.listenResize(this.handleResize);

	}

	componentWillUnmount() {

		scrollViewRx.remove(this.scrollObserver);
		scrollViewRx.remove(this.resizeObserver);

	}

	componentDidUpdate(prevProps, prevState) {

		if (!this.props.continuos) {
			if (!prevState.viewed && this.state.viewed) {
				scrollViewRx.remove(this.scrollObserver);
				scrollViewRx.remove(this.resizeObserver);
			} else if (prevState.viewed && !this.state.viewed) {
				scrollViewRx.listenScroll(this.scrollObserver);
				scrollViewRx.listenResize(this.resizeObserver);
			}
		}


	}

	addToRef(ref) {

		this.$ref = ref;

	}

	handleResize() {

		if (this.state.viewed) {
			this.setState({
				viewed: false
			});
			scrollViewRx.listenScroll(this.handleScroll);
		}
		this.getBoundingClientRect();

	}

	handleScroll(scrollData) {

		if (!this.state.viewed && this.checkIfIsOnView(scrollData)) {

			this.setState({
				viewed: true
			});

		} else if (this.state.viewed && !this.checkIfIsOnView(scrollData)) {

			this.setState({
				viewed: false
			});

		}

	}

	checkIfIsOnView(scrollData) {

		const {
			top,
			bottom
		} = this.boundingClientRect;

		const {
			fromTop,
			end
		} = this.props;

		return scrollData[scrollData.direction] + window.innerHeight * (!end ? fromTop : 1) >= (!end ? top : bottom);

	}

	getBoundingClientRect() {

		this.boundingClientRect = this.$ref.getBoundingClientRect();

	}

	render() {

		const parentProps = Object.assign(this.state, {
			addToRef: this.addToRef
		});

		const childWithProp = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, parentProps);
		});

		return childWithProp;

	}

}

ScrollView.propTypes = {
	fromTop: PropTypes.number,
	end: PropTypes.bool,
	continuos: PropTypes.bool
};

ScrollView.defaultProps = {
	fromTop: 1,
	end: false,
	continuos: false
};

export default ScrollView;