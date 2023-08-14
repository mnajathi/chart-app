import { create } from 'zustand'
import moment from 'moment';

import { DateState } from './types';

export const useDateStore = create<DateState>((set) => ({
    fromValue: moment().subtract(7, 'days').format('YYYY-MM-DD'),
  toValue: moment().format('YYYY-MM-DD'),

    setFromValue: (from) => set({ fromValue: from }),
    setToValue: (to) => set({ toValue: to }),
}));

export default useDateStore;