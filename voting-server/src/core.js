/* @flow */
import {List, Map} from 'immutable';

export function setEntries(state: Map, entries: List) {
	const list = List(entries);
	return state.set('entries', list)
		.set('initialEntries', list);
}