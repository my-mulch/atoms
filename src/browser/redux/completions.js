import axios from "axios"

const SUGGEST = 'AUTO_COMPLETE'
const CLEAR = 'CLEAR_COMPLETIONS'

const complete = completions => ({ type: SUGGEST, completions })
const clear = _ => ({ type: CLEAR })

const reducer = (completions = [], action) => {
    if (action.type === SUGGEST) return action.completions
    if (action.type === CLEAR) return []

    return completions
}

export const suggest = query => dispatch =>
    axios.get(`/suggest?input=${query}`)
        .then(res => dispatch(complete(res.data)))
        .catch(console.error)

export const clearCompletions = _ => dispatch => dispatch(clear())


export default reducer
