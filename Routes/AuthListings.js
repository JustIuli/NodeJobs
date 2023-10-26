const express = require('express');

const router = express.Router();

const ListingController = require('../Controllers/ListingController');

router.get('/create' , ListingController.getCreate);

router.post('/create' , ListingController.postCreate);

router.post('/deletelisting' , ListingController.deleteListing)

router.get('/manage' , ListingController.getManage);

router.get('/listing/edit/:listingId' , ListingController.getEdit);

router.post('/listing/edit' , ListingController.postEdit);

module.exports = router;