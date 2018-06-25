import React, { Component } from 'react';
import { debounce } from 'lodash';
import Scrollbar from 'react-smooth-scrollbar';

import ScrollView from './ScrollView';
import ScrollViewService from './ScrollView/ScrollViewService.js';
import DemoComponent from './DemoComponent';

class PageSmoothScrollbar extends Component {

	componentDidMount() {

		window.addEventListener('resize', debounce(() => {

			ScrollViewService.onResize({
				width: window.innerWidth,
				height: window.innerHeight
			});

			ScrollViewService.onScroll({
				direction: 'y',
				x: this.$scrollbar.scrollbar.offset.x,
				y: this.$scrollbar.scrollbar.offset.y
			});

		}, 200));

		this.onScroll({ offset: {x: 0, y: 0}});

	}

	onScroll({ offset }) {

		ScrollViewService.onScroll({
			direction: 'y',
			x: offset.x,
			y: offset.y
		});

	}

	render() {
		return (
			<Scrollbar onScroll={this.onScroll.bind(this)} ref={ref => this.$scrollbar = ref}>
				<ScrollView>
					<DemoComponent />
				</ScrollView>
				<ScrollView continuos fromTop={0.5}>
					<DemoComponent />
				</ScrollView>
				<ScrollView fromTop={0}>
					<DemoComponent />
				</ScrollView>
				<ScrollView end>
					<DemoComponent />
				</ScrollView>
			</Scrollbar>
		);
	}

}

export default PageSmoothScrollbar;