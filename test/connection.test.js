require("dotenv").config({ path: "./config/.env" })

const mongoose = require("mongoose")
const jobsService = require("../services/JobsService")

describe("Make and Test Connection", () => {
  beforeAll(async () => {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  })

  test("Retrieve job by Id", async () => {
    const id = "63b76d86461066869cb37e63"
    const job = await jobsService.getJobById(id)
    expect(job.jobNumber).toBe(10025)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
