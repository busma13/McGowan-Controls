const jobsService = require('../services/JobsService')
const Unit = require('../models/Unit')
const Customer = require('../models/Customer')
const JobsService = require('../services/JobsService')

module.exports = {
  getJobs: async (req, res) => {
    // console.log(req.user)
    try {
      const jobs = await jobsService.getAllJobs()
      const companyNamesPromises = jobs.map(async (job) => {
        const customer = await Customer.findById(job.customer)
          .select('companyName')
          .exec()
        return customer
      })
      const companyNames = await Promise.all(companyNamesPromises)
      // console.log(companyNames)
      const unitsPromises = jobs.map(async (job) => {
        const unitsArray = await Unit.find(
          { jobId: job._id },
          'manufacturer modelNumber jobId'
        ).exec()
        // console.log(job.jobNumber)
        // console.log(unitsArray)
        return unitsArray
      })
      const unitsArrays = await Promise.all(unitsPromises)
      // console.log(unitsArrays)
      res.render('jobs.ejs', {
        user: req.user,
        pageName: 'Jobs',
        url: 'jobs',
        jobs: jobs,
        companyNames: companyNames,
        units: unitsArrays,
      })
    } catch (err) {
      console.log(err)
    }
  },
  getSingleJob: async (req, res) => {
    // console.log('getSingleJob')
    try {
      const job = await jobsService.getJobById(req.params.jobId)
      const units = await Unit.find({ jobId: job._id }).sort({
        manufacturer: 1,
        modelNumber: 1,
      })
      const customer = await Customer.findById(job.customer)
      res.render('singleJob.ejs', {
        user: req.user,
        pageName: `Job # ${job.jobNumber} - ${customer.companyName}`,
        url: `jobs/${req.params.jobId}`,
        units: units,
        customerObject: customer,
        jobObject: job,
      })
    } catch (err) {
      console.log(err)
    }
  },
  getJobCreator: async (req, res) => {
    // console.log('jobCreator')
    const customerList = await Customer.find()

    try {
      res.render('jobCreator.ejs', {
        user: req.user,
        pageName: `Job Creator`,
        url: `jobs/jobCreator`,
        customerList: customerList,
      })
    } catch (err) {
      console.log(err)
    }
  },
  createJob: async (req, res) => {
    try {
      // console.log(req.body)
      const unitIdArray = []
      let job = await JobsService.createJob(req.body)

      const unitsArray = JSON.parse(req.body.units)

      for (const obj of unitsArray) {
        let unit = await Unit.create({
          manufacturer: obj.manufacturer,
          modelNumber: obj.modelNumber,
          serialNumber: obj.serialNumber,
          statusValue: obj.statusValue,
          statusString: obj.statusString,
          price: obj.price,
          saleType: obj.saleType,
          coreExchange: obj.coreExchange,
          shipped: obj.shipped,
          comments: obj.comments,
          jobId: job._id,
        })
        // console.log(unit._id)
        console.log('Unit added to job')
        const unitId = unit._id
        unitIdArray.push(unitId)
      }

      await JobsService.findJobByIdAndUpdate(job._id, { units: unitIdArray })
      console.log('New job added')
      res.redirect('/jobs')
    } catch (err) {
      console.log(err)
    }
  },
  createCustomer: async (req, res) => {
    try {
      // console.log(req.body)
      const customer = await Customer.create({
        companyName: req.body.companyName,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
        contact: req.body.contact,
        tel: req.body.tel,
        fax: req.body.fax,
        comments: req.body.customerComments,
      })
      console.log('New customer added')
      console.log(customer)
      res.json(customer)
    } catch (err) {
      console.log(err)
    }
  },
  createJobUnit: async (req, res) => {
    try {
      // console.log(req.body)
      let unit = await Unit.create({
        manufacturer: req.body.manufacturer,
        modelNumber: req.body.modelNumber,
        serialNumber: req.body.serialNumber,
        statusValue: req.body.statusValue,
        statusString: req.body.statusString,
        price: req.body.price,
        saleType: req.body.saleType,
        coreExchange: req.body.coreExchange,
        unitComments: req.body.unitComments,
        jobId: req.params.jobId,
      })

      await JobsService.findJobByIdAndUpdate(req.params.jobId, {
        $push: { units: unit._id },
      })
      console.log('Unit added to job')
      res.redirect(`/jobs/${req.params.jobId}`)
    } catch (err) {
      console.log(err)
    }
  },
  // editJob: async (req, res)=>{
  //     try {
  //         let key = req.body.column;
  //         let obj = {[key]: req.body.cellContent}
  //         await Job.findByIdAndUpdate(req.params.jobId, obj)
  //         console.log('Job Updated')
  //         res.json('Job updated')
  //     } catch (err) {
  //         console.log(err)
  //     }
  // },
  deleteJob: async (req, res) => {
    try {
      const job = await JobsService.findJobByIdAndRemove(req.params.jobId)
      console.log('job: ', job)
      job.units.forEach(async (unit) => await Unit.findByIdAndRemove(unit))
      console.log('Deleted Job')
      res.redirect('/jobs')
    } catch (err) {
      console.log(err)
    }
  },
  deleteJobUnit: async (req, res) => {
    try {
      console.log(req.params.unitId)
      await Unit.findByIdAndRemove(req.params.unitId)
      // let response = await Job.findByIdAndUpdate(req.params.jobId, { "units.0": req.params.unitId }).exec()
      const job = await JobsService.getJobById(req.params.jobId)
      job.units.pull({ _id: req.params.unitId })
      await job.save()
      // let response = await Job.findByIdAndUpdate(req.params.jobId, { $pull:  "units.0" })
      console.log('Deleted Unit from Job')
      res.redirect(`/jobs/${req.params.jobId}`)
    } catch (err) {
      console.log(err)
    }
  },
}
