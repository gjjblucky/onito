const express = require('express')
const controller = require('../controller/user.js')


const router = express.Router()

router.get('/longest-duration-movies', controller.longestDuration)
router.post('/new-movie', controller.addMovies)
router.get('/top-rated-movies', controller.topratedMovies)
router.get('/update-runtime-minutes', controller.runtime)

module.exports = router