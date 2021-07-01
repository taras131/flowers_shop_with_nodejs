const Router = require('express')
const brandController = require('../controllers/BrandController')
const router = new Router()
router.post('/',brandController.create)
router.get('/', brandController.getAll)

module.exports = router