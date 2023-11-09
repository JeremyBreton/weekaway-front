import eventsReducer from './events';
import userReducer from './user';
import notificationReducer from './notification';

const reducer = {
  user: userReducer,
  events: eventsReducer,
  notification: notificationReducer,
};

export default reducer;
