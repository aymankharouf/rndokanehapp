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
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: undefined
      }
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: undefined
      }
    default:
      return state
  }
}

export default Reducer