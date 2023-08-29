import {StateCreator} from 'zustand';

interface BgRangeType {
	min: number;
	max: number;
}

export type BgRangeSlice = {
	bgRange: BgRangeType;
	setBgRange: ({min, max}: BgRangeType) => void;
};

export const createBgRangeStore: StateCreator<BgRangeSlice> = (set) => ({
	bgRange: {min: 0, max: 8},
	setBgRange: ({min, max}) => set({bgRange: {min, max}}),
});
