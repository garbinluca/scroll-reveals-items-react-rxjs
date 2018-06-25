import React  from 'react';
import classNames from 'classnames';

export default ({ viewed, addToRef }) => {

	return (
		<div className={classNames('DemoComponent', { 'DemoComponent--active': viewed})} ref={ref => addToRef(ref)}>
			<div>Il componente <span>{viewed ? 'è' : 'non è'} visible</span></div>
		</div>
	);

}
