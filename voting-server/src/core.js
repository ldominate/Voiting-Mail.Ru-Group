/* @flow */
import {List, Map} from 'immutable';

function getWinners(vote: Map) {
	if(!vote) return [];
	const [a, b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);
	if(aVotes > bVotes) return [a];
	else if(aVotes < bVotes) return [b];
	else return [a, b];
}

export function setEntries(state: Map, entries: List) {
	const list = List(entries);
	return state.set('entries', list)
		.set('initialEntries', list);
}

export function next(state: Map){
	const entries = state.get('entries')
		.concat(getWinners(state.get('vote')));
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	});
}

export function vote(state: Map, entry: String) {
	return state.updateIn(
		['vote', 'tally', entry],
		0,
		tally => tally + 1
	);
}