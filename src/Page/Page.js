import React, { Component } from 'react';
import { debounce } from 'lodash';

import ScrollView from '../ScrollView';
import DemoComponent from '../DemoComponent';
import scrollViewRx from '../ScrollView/ScrollViewRx.js';

class Page extends Component {

	componentDidMount() {

		window.addEventListener('scroll', () => {

			scrollViewRx.onScroll({
				direction: 'y',
				x: window.pageXOffset,
				y: window.pageYOffset
			});

		});

		window.addEventListener('resize', debounce(() => {

			console.log('resize');
			scrollViewRx.onResize({
				width: window.innerWidth,
				height: window.innerHeight
			});

			scrollViewRx.onScroll({
				direction: 'y',
				x: window.pageXOffset,
				y: window.pageYOffset
			});

		}, 200));

		scrollViewRx.onScroll({
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