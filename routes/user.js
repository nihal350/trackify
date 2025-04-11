const router = require('express').Router()

const { viewAllBus, busLocation, viewMap, getReview, addReview } = require('../controllers/user')


router
    .route('/')
    .get(viewAllBus)

router
    .route('/bus/:id')
    .get(busLocation)

router
    .route('/map')
    .get(viewMap)

router
    .route('/review')
    .get(getReview)
    .post(addReview)

module.exports = router