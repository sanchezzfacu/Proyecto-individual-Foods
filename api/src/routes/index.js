const { Router } = require('express');

const recipesRoute = require('./recipes')
const recipeRoute = require('./recipe')
const typesRoute = require('./types')

const router = Router();

router.use('/recipes', recipesRoute)
router.use('/recipe', recipeRoute)
router.use('/types', typesRoute)


module.exports = router;
