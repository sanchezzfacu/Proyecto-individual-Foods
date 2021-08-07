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

export function filterRecipeByType(payload) {
    return {
        type: 'FILTER_BY_RECIPE',
        payload 
    }
}