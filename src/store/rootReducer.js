import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import testing from './slices/testingSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        testing,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
