require("dotenv").config({ path: "./config/.env" })

const mongoose = require("mongoose")
const jobsService = require("../services/JobsService")

describe("Get all Jobs", () => {
  beforeAll(async () => {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  })

  test("Get all jobs", async () => {
    const jobs = await jobsService.getAllJobs()
    expect(jobs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customer: expect.any(String),
          jobNumber: expect.any(Number),
        }),
      ])
    )
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
