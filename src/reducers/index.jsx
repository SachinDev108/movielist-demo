import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { 
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
  SEARCH_MOVIE,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAILURE,
  ENTER_SEARCH_TEXT
} from 'actions'

const movieListDefaultState = {
  isFetching: false,
  items:[],
  error:{},
  page: 1,
  totalPages: null,
  totalItems: null
}

const movieList = (state = movieListDefaultState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
    case SEARCH_MOVIE:
      return {...state, isFetching:true}
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state, isFetching:false,
        items:action.data.results,
        page: action.data.page,
        totalPages: action.data.totalPages,
        totalItems: action.data.totalItems
      }
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state, isFetching:false,
        items:action.data
      }
    case FETCH_MOVIES_FAILURE:
    case SEARCH_MOVIE_FAILURE:
      return {
        ...state,
        isFetching:false,
        error:action.data
      }
    default:
      return state
  }
}

const movieDefaultState = {
  isFetching: false,
  item:{},
  error:{}
}

const movieDetail = (state = movieDefaultState, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return Object.assign({}, state, {
        isFetching:true
      })
    case FETCH_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        isFetching:false,
        item:action.data
      })
    case FETCH_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching:false,
        error:action.data
      })
    default:
      return state
  }
}

const input = (state = '', action) => {
  switch (action.type) {
    case ENTER_SEARCH_TEXT:
      return Object.assign({}, state, {
        isFetching:true
      })
    default:
      return state
  }
}

const movieApp = combineReducers({
  movieList,
  movieDetail,
  input,
  routing: routerReducer
})

export default movieApp
