/*
> Observable: represents the idea of an invokable collection of future values or events.
> Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
> Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers
 */

import { Subject, Observable } from 'rxjs';
import { map, merge, publishReplay, refCount, tap } from 'rxjs/operators';

class ScrollViewService {

	resize$ = new Subject();
	scroll$ = new Subject();

	handleScroll(callback) {

		return new Observable()
			.pipe(merge(this.scroll$))
			.pipe(tap(dataScroll => callback(dataScroll)));

	}

	handleResize(callback) {

		return new Observable()
			.pipe(merge(this.resize$))
			.pipe(tap(windowSize => callback(windowSize)));

	}

	onScroll(scrollData) {

		this.scroll$.next(scrollData);

	}

	onResize(windowSize) {

		this.resize$.next(windowSize);

	}

	listenScroll(callback) {

		const observable = this.handleScroll(callback);
		const observer = observable.subscribe(() => true, e => console.error(e));
		return observer;

	}

	listenResize(callback) {

		const observable = this.handleResize(callback);
		const observer = observable.subscribe(() => true, e => console.error(e));
		return observer;

	}

	remove(observer) {

		if (observer) {
			observer.unsubscribe();
		}

	}

}

export default new ScrollViewService();