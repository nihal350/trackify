const router = require('express').Router()

const {getDriverLogin, driverLogin, driverLogout, sendDriverOtp } = require('../controllers/auth')
const { updateLocation } = require('../controllers/driver')

router
    .route('/otp')
    .get(sendDriverOtp)

router
    .route('/login')
    .get(getDriverLogin)
    .post(driverLogin)

router
    .route('/logout')
    .get(driverLogout)


router
    .route('/location')
    .post(updateLocation)

module.exports = router