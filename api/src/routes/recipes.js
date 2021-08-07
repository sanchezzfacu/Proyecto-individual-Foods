const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const e = require('express');
const {Recipe, Diet} = require('../db')
const { API_KEY } = process.env;

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = await apiUrl.data.results.map( el => {
        return {
            name: el.title,
            img: el.image,
            id: el.id,
            resumen: el.resume,
            healthy_level: el.healthScore,
            puntuacion : el.spoonacularScore,
            step_by_step: el.analyzedInstructions.map(el => el.steps.map(el => el.step.toString())),
            diet: el.diets.map(el => el)
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [] 
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

router.get('/', async (req,res) => {
    const { name } = req.query;
    let recipeTotal = await getAllRecipes();
        if(name) {
            let recipeName = await recipeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send('Error de pana')
        } else {
        res.status(200).send(recipeTotal)
    }     
})

router.get('/:id', async (req, res) => {
    const  { id } = req.params;
    const recipesTotal = await getAllRecipes()
    if(id) {
        recipeId = await recipesTotal.filter(el => el.id == id)
        recipeId.length ?
        res.status(200).json(recipeId) : 
        res.status(404).send('No encotrado')
    }
})

module.exports = router;