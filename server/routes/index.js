var express = require('express');
var router = express.Router();
var control = require('../controllers')

router.get('/:id/related',control.relatedProduct);
router.get('/:id/styles',control.styleProduct);
router.get("/:id",control.product)
router.get("/meta/:id",control.getReviews)

module.exports = router;