import axios from "axios"

/* ------------------------- ACTIONS -------------------------- */
const SUGGEST = 'SUGGEST_ARTICLES';

/*---------------------- ACTION CREATORS -----------------------*/
const suggest = suggestions => ({ type: SUGGEST, suggestions })

/* ------------------------- REDUCERS ------------------------- */
const reducer = (suggestions = [], action) => {
    return action.type === SUGGEST ? action.suggestions : suggestions
}

/* ------------------------- THUNKS ------------------------- */
export const getSuggestions = key => dispatch => {
    axios.post('/suggest', { key: key })
        .then(suggestions => {
            dispatch(suggest(suggestions.data))
        }).catch(console.error)
}

export default reducer
