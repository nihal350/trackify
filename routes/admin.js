const router = require('express').Router()

const { getDashboard, getBus, getAddBus, addBus, getEditBus, editBus, getBusForRoute, getManageRoute, getViewRoute, getAddStop, addStop, deleteStop, getReviews } = require('../controllers/admin')

router
    .route('/')
    .get(getDashboard)

router
    .route('/bus')
    .get(getBus)

router
    .route('/bus/add')
    .get(getAddBus)
    .post(addBus)

router
    .route('/bus/:id/edit')
    .get(getEditBus)
    .post(editBus)

router
    .route('/route')
    .get(getBusForRoute)

router
    .route('/route/:id')
    .get(getViewRoute)

router
    .route('/stop/add')
    .get(getAddStop)
    .post(addStop)

router
    .route('/stop/delete')
    .get(deleteStop)

router
    .route('/reviews')
    .get(getReviews)
module.exports = router