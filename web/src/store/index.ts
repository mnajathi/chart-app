import {create} from 'zustand';
import {type DateSlice, createDateSlice} from './slice/date';
import {type BgRangeSlice, createBgRangeStore} from './slice/bgRange';

const useAppStore = create<DateSlice & BgRangeSlice>()((...a) => ({
	...createDateSlice(...a),
	...createBgRangeStore(...a),
}));

export default useAppStore;
