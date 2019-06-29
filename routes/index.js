const router = require('express').Router()
const productRoutes = require('./products')
const path = require('path')
router.use('/products', productRoutes)

router.use((req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router
