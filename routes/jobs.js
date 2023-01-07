const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/jobs') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, jobsController.getJobs)

router.get('/createJob', ensureAuth, jobsController.getJobCreator)

router.get('/:jobId', ensureAuth, jobsController.getSingleJob)

router.post('/createJob', ensureAuth, jobsController.createJob)

router.post('/createCustomer', ensureAuth, jobsController.createCustomer)

router.post('/createJobUnit/:jobId', ensureAuth, jobsController.createJobUnit)

// router.put('/favoritePriceList/:listId', ensureAuth, jobsController.favoritePriceList)

// router.put('/editPriceListItem/:listId/:itemId', ensureAuth, jobsController.editPriceListItem)

router.delete('/deleteJob/:jobId', ensureAuth, jobsController.deleteJob)

router.delete('/deleteJobUnit/:jobId/:unitId', ensureAuth, jobsController.deleteJobUnit)

module.exports = router