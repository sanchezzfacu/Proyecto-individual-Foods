const router = require('express').Router();
const {Recipe, Diet} = require('../db');

router.post('/', async (req, res) => {
    let {
        name,
        resumen,
        img,
        puntuacion,
        healthy_level,
        step_by_step,
        diet,
    } = req.body

    let recipeCreated = await Recipe.create({
        name,
        resumen,
        img,
        puntuacion,
        healthy_level,
        step_by_step,
    })

    let typeDb = await Diet.findAll({
        where : {name: diet}
    })
    recipeCreated.addDiet(typeDb)
    res.send('Personaje creado satisfactoriamente')
})

module.exports = router

