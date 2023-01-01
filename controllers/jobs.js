const Job = require('../models/Job')
const Unit = require('../models/Unit')
const Customer = require('../models/Customer')

module.exports = {
    getJobs: async (req,res)=>{
        console.log(req.user)
        try{
            const jobs = await Job.find().sort({_id: "desc"})
            res.render('jobs.ejs',  { user: req.user, pageName: 'Jobs', url: 'jobs', jobs: jobs})
        }catch(err){
            console.log(err)
        }
    },
    getSingleJob: async (req,res)=>{
        console.log('getSingleJob')
        console.log(req.user)
        try{
            const units = await Unit.find({jobId: req.params.jobId}).sort({'manufacturer': 1, 'modelNumber': 1})
            const job = await Job.findById(req.params.jobId)
            const customer = await Customer.findById(job.customer)
            console.log(units)
            res.render('singleJob.ejs',  { user: req.user, pageName: `Job #  - ${job.jobNumber}, ${customer.companyName}`, url: `jobs/${req.params.jobId}`, units: units, customer: customer, jobId: req.params.jobId })
        }catch(err){
            console.log(err)
        }
    },
    getJobCreator: async (req, res)=>{
        console.log('jobCreator')
        const customerList = await Customer.find()

        try{
            res.render('jobCreator.ejs',  { user: req.user, pageName: `Job Creator`, url: `jobs/jobCreator`, customerList: customerList })
        }catch(err){
            console.log(err)
        }
    },
    createJob: async (req, res)=>{
        try{
            console.log(req.body)
            await Job.create({inDate: req.body.inDate, customer: req.body.company, poNumber: req.body.poNumber, refNumber: req.body.refNumber, quantity: req.body.quantity, units: req.body.units, shipped: req.body.shipped, invoiced: req.body.invoiced, comments: req.body.jobComments })
            console.log('New job added')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }
    },
    createCustomer: async (req, res)=>{
        try{
            console.log(req.body)
            await Customer.create({companyName: req.body.companyName, shippingAddress: req.body.shippingAddress, billingAddress: req.body.billingAddress, contact: req.body.contact, tel: req.body.tel, fax: req.body.fax, comments: req.body.customerComments })
            console.log('New customer added')
            res.redirect('/jobs/createJob')
        }catch(err){
            console.log(err)
        }
    },
    createJobUnit: async (req, res)=>{
        try{
            console.log(req.body)
            await Unit.create({ manufacturer: req.body.manufacturer, modelNumber: req.body.modelNumber, serialNumber: req.body.serialNumber, status: req.body.status, price: req.body.price, saleType: req.body.saleType, coreExchange: req.body.coreExchange, comments: req.body.unitComments, jobId: req.params.jobId })
            console.log('Unit added to job')
            // res.redirect(`/jobs/${req.params.jobId}`)
            res.redirect('/jobs/createJob')
        }catch(err){
            console.log(err)
        }
    },
    // favoritePriceList: async (req, res)=>{
    //     try {
    //         if (req.query.favorited === 'true') {
    //             await Job.findByIdAndUpdate(req.params.listId, {'favorite' : false})   
    //             console.log('List removed from favorites')
    //             // res.json('List removed from favorites')
    //             res.redirect('/priceLists')

    //         } else {
    //             await Job.findByIdAndUpdate(req.params.listId, {'favorite' : true})   
    //             console.log('List added to favorites')
    //             // res.json('List added to favorites')
    //             res.redirect('/priceLists')
    //         }
            
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
    // editPriceListItem: async (req, res)=>{
    //     try {
    //         let key = req.body.column;
    //         let obj = {[key]: req.body.cellContent}
    //         await Unit.findByIdAndUpdate(req.params.itemId, obj)   
    //         console.log('Price List Item Updated')
    //         res.json('Price list item updated')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
    deleteJob: async (req, res)=>{
        try{
            await Job.findByIdAndRemove(req.params.listId)
            console.log('Deleted Job')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }
    },
    deleteJobUnit: async (req, res)=>{
        try{
            await Unit.findByIdAndRemove(req.params.itemId)
            console.log('Deleted Unit from Job')
            res.redirect(`/jobs/${req.params.jobId}`)
        }catch(err){
            console.log(err)
        }
    }
}    