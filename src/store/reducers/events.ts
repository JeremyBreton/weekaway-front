import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
// import axios from 'axios';
import Cookies from 'js-cookie';

import axiosInstance from '../../utils/axios';
import { Event } from '../../@types/Event';

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
  // loading: boolean;
  list: Event[];
  eventsArray: Event[];
  oneEvent: Event[];
}
export const initialState: EventsState = {
  // loading: true,
  list: [],
  eventsArray: [],
  oneEvent: [],
};

export const fetchEvents = createAsyncThunk('event/fetch', async () => {
  const id = Cookies.get('id');
  const { data } = await axiosInstance.get(`/user/${id}/events`);
  console.log('data', data);

  const eventsArray = data.events;
  console.log('coucou ici', eventsArray);

  return { data, eventsArray };
});

export const fetchOneEvent = createAsyncThunk('oneEvent/fetch', async () => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
  const eventId = Cookies.get('eventId');
  const { data } = await axiosInstance.get(`/event/${eventId}`);
  console.log('data de fetchOneEvent', data);
  console.log('data.data');

  return { data };
});

const eventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEvents.pending, (state) => {
      // state.loading = true;
    })
    .addCase(fetchEvents.fulfilled, (state, action) => {
      // state.loading = false;
      // state.list = action.payload;
      state.eventsArray = action.payload.eventsArray;
    })
    .addCase(fetchEvents.rejected, (state) => {
      state.list = [];
    })
    .addCase(fetchOneEvent.fulfilled, (state, action) => {
      state.oneEvent = action.payload.data;
      console.log('action.payload.data', action.payload.data);
    });
});

export default eventsReducer;
