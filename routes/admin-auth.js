const router = require('express').Router()

const { getAdminLogin, adminLogin, adminLogout } = require('../controllers/auth')

router
    .route('/login')
    .get(getAdminLogin)
    .post(adminLogin)

router
    .route('/logout')
    .get(adminLogout)

module.exports = router