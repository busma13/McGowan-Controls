const Job = require('../models/Job')
const Unit = require('../models/Unit')
const Customer = require('../models/Customer')

module.exports = {
    getJobs: async (req,res)=>{
        // console.log(req.user)
        try{
            const jobs = await Job.find().sort({_id: "desc"})
            res.render('jobs.ejs',  { user: req.user, pageName: 'Jobs', url: 'jobs', jobs: jobs})
        }catch(err){
            console.log(err)
        }
    },
    getSingleJob: async (req,res)=>{
        console.log('getSingleJob')
        try{
            const job = await Job.findById(req.params.jobId)
            const units = await Unit.find({jobId: job._id}).sort({'manufacturer': 1, 'modelNumber': 1})
            const unitIds = units.map(unit => unit._id)
            console.log(unitIds)
            const customer = await Customer.findById(job.customer)
            res.render('singleJob.ejs',  { user: req.user, pageName: `Job # ${job.jobNumber} - ${customer.companyName}`, url: `jobs/${req.params.jobId}`, units: units, customer: customer, jobId: req.params.jobId })
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
            // console.log(req.body.units)
            const unitIdArray = []
            
            let job = await Job.create({inDate: req.body.inDate, customer: req.body.company, poNumber: req.body.poNumber, refNumber: req.body.refNumber, quantity: req.body.quantity, units: unitIdArray, shipped: req.body.shipped, invoiced: req.body.invoiced, comments: req.body.jobComments })
            
            const unitsArray = JSON.parse(req.body.units)
            // console.log(unitsArray)

            for (const obj of unitsArray) {
                let unit = await Unit.create({ manufacturer: obj.manufacturer, modelNumber: obj.modelNumber, serialNumber: obj.serialNumber, statusValue: obj.statusValue, statusString: obj.statusString, price: obj.price, saleType: obj.saleType, coreExchange: obj.coreExchange, comments: obj.comments, jobId: job._id })
                // console.log(unit._id)
                console.log('Unit added to job')
                const unitId = unit._id
                unitIdArray.push(unitId)
            }

            await Job.findByIdAndUpdate(job._id, {units: unitIdArray})
            console.log('New job added')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }
    },
    createCustomer: async (req, res)=>{
        try{
            // console.log(req.body)
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
            let unit = await Unit.create({ manufacturer: req.body.manufacturer, modelNumber: req.body.modelNumber, serialNumber: req.body.serialNumber, statusValue: req.body.statusValue, statusString: req.body.statusString, price: req.body.price, saleType: req.body.saleType, coreExchange: req.body.coreExchange, comments: req.body.comments, jobId: req.params.jobId })

            await Job.findOneAndUpdate({ _id:req.params.jobId}, { $push: {units: unit._id }}).exec()
            console.log('Unit added to job')
            res.redirect(`/jobs/${req.params.jobId}`)
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
            await Job.findByIdAndRemove(req.params.jobId)
            console.log('Deleted Job')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }
    },
    deleteJobUnit: async (req, res)=>{
        try{
            await Unit.findByIdAndRemove(req.params.unitId)
            await Job.findByIdAndUpdate(req.params.jobId, )
            console.log('Deleted Unit from Job')
            res.redirect(`/jobs/${req.params.jobId}`)
        }catch(err){
            console.log(err)
        }
    }
}    