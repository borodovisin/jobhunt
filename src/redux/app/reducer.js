import createReducer from 'lib/createReducer'

const initialState = {
  test: 0
}

const reducer = {
  ERROR(state, { payload }){
    return state
  },
  SUCCESS(state, { payload }){
    return state
  }
}

export default createReducer(initialState, reducer)