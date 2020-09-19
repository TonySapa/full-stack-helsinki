import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import timeoutReducer from "./reducers/timeoutReducer";
import blogsReducer from "./reducers/blogsReducer";
import commentsReducer from "./reducers/commentsReducer";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notification: notificationReducer,
  timeout: timeoutReducer,
  blogs: blogsReducer,
  user: userReducer,
  comments: commentsReducer
});

const store = createStore(
  reducer,
  composeWithDevTools === undefined
    ? applyMiddleware(thunk)
    : composeWithDevTools(
      applyMiddleware(thunk)
    )
);

export default store;
