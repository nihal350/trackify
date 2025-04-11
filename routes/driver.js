const router = require('express').Router()

const { getPage, viewRoute, startTrip, stopTrip, stopVisit } = require('../controllers/driver')


router
    .route('/')
    .get(getPage)

router
    .route('/route')
    .get(viewRoute)

router
    .route('/start')
    .get(startTrip)

router
    .route('/stop')
    .get(stopTrip)

router
    .route('/visit/:id')
    .get(stopVisit)
    
module.exports = router