import axios from "axios"

const SUGGEST = 'AUTO_COMPLETE'
const CLEAR = 'CLEAR_COMPLETIONS'

const autoComplete = completions => ({ type: SUGGEST, completions })
const clearCompletions = _ => ({ type: CLEAR })

const reducer = (completions = [], action) => {
    if (action.type === SUGGEST) return action.completions
    if (action.type === CLEAR) return []

    return completions
}

export const suggest = query => dispatch =>
    axios.get(`/suggest?input=${query}`)
        .then(res => dispatch(autoComplete(res.data)))
        .catch(console.error)

export const clear = _ => dispatch => dispatch(clearCompletions())


export default reducer
