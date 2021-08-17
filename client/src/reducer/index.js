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
                allRecipes: action.payload,
            }
        
        case 'GET_RECIPE_NAME' : 
            return {        
                ...state,
                recipes: action.payload,
            }
        
        case 'FILTER_BY_RECIPE': 
            const allRecipes = state.allRecipes
            const recipeFiltered = action.payload === 'all' ? allRecipes : 

            allRecipes.filter(el => el.diet ? el.diet.toString().includes(action.payload) : 
            el.diets.map(el => el.name.toString().includes(action.payload)))
            return {
                ...state,
                recipes: recipeFiltered
            }
        
        case 'GET_DETAIL': 
            return {
                ...state,
                allDetails: action.id
            }
        
        case 'ORDER_BY_SCORE' :
            let sortedScore = action.payload === 'lowest' ? 
            state.allRecipes.sort(function(a,b){
                if(a.puntuacion > b.puntuacion) {
                    return 1
                }
                if(b.puntuacion > a.puntuacion) {
                    return -1
                }
                return 0
            }) :
            state.allRecipes.sort(function(a,b) {
                if(a.puntuacion > b.puntuacion) {
                    return -1
                }
                if(b.puntuacion > a.puntuacion) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: sortedScore
            }
        /* falls through */
        case 'ORDER_BY_NAME' :
            const sortedArr = action.payload === 'asc' ? 
            state.allRecipes.sort(function(a,b) {
                if(a.name > b.name) {
                    return 1 
                } 
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.allRecipes.sort(function(a,b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
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