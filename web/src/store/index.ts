import { create } from 'zustand'

import { DateState } from './types';

export const useDateStore = create<DateState>((set) => ({
    fromValue: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    toValue: new Date().toISOString().split('T')[0],

    setFromValue: (from) => set({ fromValue: from }),
    setToValue: (to) => set({ toValue: to }),
}));

export default useDateStore;