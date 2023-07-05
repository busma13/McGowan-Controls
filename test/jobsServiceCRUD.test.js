require('dotenv').config({ path: './config/.env' })

const mongoose = require('mongoose')
const jobsService = require('../services/JobsService')

describe('Test all CRUD operations', () => {
  beforeAll(async () => {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  })

  test('Get a job', async () => {
    const id = '63b76d86461066869cb37e63'
    const jobById = await jobsService.getJobById(id)
    expect(jobById).toEqual(
      expect.objectContaining({
        jobNumber: 10025,
        customer: expect.any(String),
      })
    )
  })

  test('Create a job', async () => {
    const newJob = {
      inDate: Date.now(),
      company: '63b9e00ac3aac08cdb8eec7b',
      poNumber: '123abc',
      refNumber: '00AA34',
      shippedVia: 'ground',
      shippingWeight: null,
      invoiced: 'No',
      jobComments: 'test job',
    }

    const newTestJobResponse = await jobsService.createJob(newJob)
    console.log(newTestJobResponse)
    expect(newTestJobResponse.inDate).toBeInstanceOf(Date)
    expect(newTestJobResponse.customer).toEqual(expect.any(String))
    expect(newTestJobResponse.poNumber).toEqual('123abc')
    expect(newTestJobResponse.refNumber).toEqual('00AA34')
    expect(newTestJobResponse.shippedVia).toEqual('ground')
    expect(newTestJobResponse.shippingWeight).toBeNull()
    expect(newTestJobResponse.invoiced).toEqual('No')
    expect(newTestJobResponse.comments).toEqual('test job')
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
