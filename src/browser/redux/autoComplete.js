import axios from "axios"

/* ------------------------- ACTIONS -------------------------- */
const SUGGEST = 'AUTOCOMPLETE';

/*---------------------- ACTION CREATORS -----------------------*/
const suggest = completions => ({ type: SUGGEST, completions })

/* ------------------------- REDUCERS ------------------------- */
const reducer = (completions = [], action) => {
    return action.type === SUGGEST ? action.completions : completions
}

/* ------------------------- THUNKS ------------------------- */
export const suggest = key => dispatch => {
    axios.post('/suggest', { key: key })
        .then(completions => {
            dispatch(suggest(completions.data))
        }).catch(console.error)
}

export default reducer
