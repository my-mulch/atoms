import axios from "axios"

const SUGGEST = 'AUTOCOMPLETE';

const autoComplete = completions => ({ type: SUGGEST, completions })

const reducer = (completions = [], action) => {
    return action.type === SUGGEST ? action.completions : completions
}

export const suggest = query => dispatch => {
    axios.get(`/suggest?input=${query}`)
        .then(res => dispatch(suggest(res.data)))
        .catch(console.error)
}

export default reducer
