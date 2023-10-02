import {createSlice, configureStore} from '@reduxjs/toolkit';
import DaysOf35HoursUtils from '../utils/days_of_36_hours_utils';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    startHour: DaysOf35HoursUtils.defaultStartHour,
  },
  reducers: {
    changeStartHour: (state, action) => {
      state.startHour = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});

// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

export const {changeStartHour} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default store;
