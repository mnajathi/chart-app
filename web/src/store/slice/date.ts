import moment from 'moment';
import {type StateCreator} from 'zustand';

export type DateSlice = {
	fromValue: string;
	toValue: string;
	setFromValue: (from: string) => void;
	setToValue: (to: string) => void;
};

export const createDateSlice: StateCreator<DateSlice> = (set) => ({
	fromValue: moment().subtract(7, 'days').format('YYYY-MM-DD'),
	toValue: moment().format('YYYY-MM-DD'),

	setFromValue(from) {
		set({fromValue: from});
	},
	setToValue(to) {
		set({toValue: to});
	},
});
