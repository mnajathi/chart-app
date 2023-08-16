import {create} from 'zustand';
import {type DateSlice, createDateSlice} from './slice/date';

const useAppStore = create<DateSlice>()((...a) => ({
	...createDateSlice(...a),
}));

export default useAppStore;
