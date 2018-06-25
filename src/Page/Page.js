import React, { Component } from 'react';
import { debounce } from 'lodash';

import ScrollView from '../ScrollView';
import ScrollViewService from '../ScrollView/ScrollViewService.js';
import DemoComponent from '../DemoComponent';

class Page extends Component {

	componentDidMount() {

		window.addEventListener('scroll', () => {

			ScrollViewService.onScroll({
				direction: 'y',
				x: window.pageXOffset,
				y: window.pageYOffset
			});

		});

		window.addEventListener('resize', debounce(() => {

			ScrollViewService.onResize({
				width: window.innerWidth,
				height: window.innerHeight
			});

			ScrollViewService.onScroll({
				direction: 'y',
				x: window.pageXOffset,
				y: window.pageYOffset
			});

		}, 200));

		ScrollViewService.onScroll({
			direction: 'y',
			x: window.pageXOffset,
			y: window.pageYOffset
		});

	}

	render() {
		return (
			<div>
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
			</div>
		);
	}

}

export default Page;