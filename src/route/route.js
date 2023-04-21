const router = require('express').Router()
const {getFile} = require('../controller/fileController')

router.get('/file',getFile)


module.exports = router