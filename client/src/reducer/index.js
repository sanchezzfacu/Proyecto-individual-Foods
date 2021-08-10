const initialState = {
    recipes : [],
    allRecipes: [],
    allDetails: [],
    types: []
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
        
        case 'GET_DETAIL': 
            return {
                ...state,
                allDetails: action.id
            }
        
        case 'ORDER_BY_NAME' :
            let sortedArr = action.payload === 'asc' ? 
            state.allRecipes.sort(function(a,b) {
                if(a.name > b.name) {
                    return 1 
                } 
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.recipes.sort(function(a,b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                recipes: sortedArr,
            }

        case 'POST_RECIPE':
            return {
                ...state
            }

        case 'GET_TYPES' :
            return {
                ...state,
                types: action.payload
            }

        default: 
            return state
    }
}

export default rootReducer;