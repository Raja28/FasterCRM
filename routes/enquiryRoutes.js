const express = require('express');
const router = express.Router();
const { getPublicEnquiries, submitEnquiry, claimEnquiry, getClaimedEnquiries } = require('../controllers/enquiryController');
const { auth } = require('../middlewares/authMiddleware');

router.get('/', auth, getPublicEnquiries);
router.post('/', submitEnquiry);
router.put('/:id/claim', auth, claimEnquiry);
router.get('/claimed', auth, getClaimedEnquiries);

module.exports = router;
