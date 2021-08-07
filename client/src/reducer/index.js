const initialState = {
    recipes : [],
    allRecipes: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES': 
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        
        case 'GET_RECIPE_NAME' : 
            return {    
                ...state,
                recipes: action.payload
            }
        
        case 'FILTER_BY_RECIPE': 
            const allRecipes = state.allRecipes
            const recipeFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(el => el.diet?.toString().includes(action.payload))
            return {
                ...state,
                recipes: recipeFiltered
            }
        
        default: 
            return state
    }
}

export default rootReducer;