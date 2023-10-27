import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
// import axios from 'axios';
import axios from 'axios';
import axiosInstance from '../../utils/axios';
import { Event } from '../../@types/Event';

// import data from '../../data';

/*
  Erreur ESLint : « Dependency cycle »

  Le problème est :
  ici on veut importer RootState depuis `store/index`
  mais `store/index` importe ce fichier

  → A importe B qui importe A qui importe B qui importe A…
*/
// import { RootState } from '..';
/*
  La première on type dans un fichier C (`@types/xxx.d.ts`).
  Une autre solution, en TS, on peut lui dire
  « n'importe que les interfaces et les types de ce fichier » 
*/
// import type { RootState } from '..';

interface EventsState {
  loading: boolean;
  list: Event[];
}
export const initialState: EventsState = {
  loading: true,
  list: [],
};

export const fetchEvents = createAsyncThunk('event/fetch', async () => {
  const { data } = await axiosInstance.get('/event');
  console.log('data', data);
  return data;
});

const eventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEvents.pending, (state) => {
      // state.loading = true;
    })
    .addCase(fetchEvents.fulfilled, (state, action) => {
      // state.loading = false;
      state.list = action.payload;
    });
});

export default eventsReducer;
