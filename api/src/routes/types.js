const router = require('express').Router();
const axios = require('axios')
const { Diet } = require('../db')
const { API_KEY } = process.env;

router.get('/', async (req, res) => {
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=5000`)
    const diets = dietsApi.data.results.map(el => el.diets)
    const dietsEach = diets.flat()

    dietsEach.forEach(el => {
        Diet.findOrCreate({
            where : {name : el}
        })
    })
    const allDiets = await Diet.findAll();
    res.send(allDiets)
})

module.exports = router;
