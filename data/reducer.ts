import { iState, iAction } from './interfaces'

const Reducer = (state: iState, action: iAction) => {
  switch (action.type){
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      }
    case 'SET_LOCATIONS':
      return {
        ...state,
        locations: action.payload
      }
    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    default:
      return state
  }
}

export default Reducer