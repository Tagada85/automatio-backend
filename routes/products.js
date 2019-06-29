const router = require('express').Router()
const productsController = require('../controllers/productsController')

router.route('/').get(productsController.fetchAll)
router.route('/:id').get(productsController.fetchById)
router.route('/create').post(productsController.create)
router.route('/delete').post(productsController.delete)

module.exports = router
