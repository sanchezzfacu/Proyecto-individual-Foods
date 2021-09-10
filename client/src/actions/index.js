import axios from 'axios'

export function getRecipes() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getRecipeName(name) {
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: 'GET_RECIPE_NAME',
                payload: json.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload) {
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function filterRecipeByType(payload) {
    return {
        type: 'FILTER_BY_RECIPE',
        payload 
    }
}

export function getDetail(id) {
    // return async function(dispatch) {
    //     let json = await axios.get('http://localhost:3001/recipes/' + id)
    //     return dispatch({
    //         type: 'GET_DETAIL',
    //         id: json.data
    //     })
    // 
    return function(dispatch) {
        axios.get('http://localhost:3001/recipes/' + id)
        .then(json => {
                return dispatch({
                    type: 'GET_DETAIL',
                    id: json.data
                })
            })
    }

}





export function getTypes() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function postRecipe(payload) {
    return async function(dispatch) {
        const json = await axios.post('http://localhost:3001/recipe', payload)
        return json
    }
}