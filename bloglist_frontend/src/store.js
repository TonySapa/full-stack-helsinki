import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
//import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  //filter: filterReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store