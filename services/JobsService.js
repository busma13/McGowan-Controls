const Job = require("../models/Job")

module.exports = class JobsService {
  static async getAllJobs() {
    try {
      const allJobs = await Job.find().sort({ _id: "desc" })
      return allJobs
    } catch (error) {
      console.log(`Could not fetch jobs ${error}`)
    }
  }

  static async getJobById(jobId) {
    try {
      const singleJobResponse = await Job.findById(jobId)
      return singleJobResponse
    } catch (error) {
      console.log(`Job not found. ${error}`)
    }
  }

  static async createJob(data) {
    try {
      const newJob = {
        inDate: data.inDate,
        customer: data.company,
        poNumber: data.poNumber,
        refNumber: data.refNumber,
        quantity: data.quantity,
        units: [],
        shippedVia: data.shippedVia,
        shippingWeight: data.shippingWeight,
        invoiced: data.invoiced,
        comments: data.jobComments,
      }
      const newJobResponse = await Job.create(newJob)
      return newJobResponse
    } catch (error) {
      console.log(`Job creation error. ${error}`)
    }
  }

  static async findJobByIdAndUpdate(jobId, unitIdObject) {
    console.log(jobId, unitIdObject)
    try {
      await Job.findByIdAndUpdate(jobId, unitIdObject).exec()
    } catch (error) {
      console.log(`Job update error. ${error}`)
    }
  }

  static async findJobByIdAndRemove(jobId) {
    try {
      const deletedJob = await Job.findByIdAndRemove(jobId)
      return deletedJob
    } catch (error) {
      console.log(`Job removal error. ${error}`)
    }
  }
}
