import eventsReducer from './events';
import userReducer from './user';

const reducer = {
  user: userReducer,
  events: eventsReducer,
};

export default reducer;
