const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async (req, res) => {
   const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs, count: jobs.length})
  };
  
  const getJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req 
    // nested destructuring/ getting userId from user and JobId from params


  };
  
  const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
  
  };
  
  const updateJob = async (req, res) => {
    res.send("update job");
  };
  
  const deleteJob = async (req, res) => {
    res.send("delete jobs");
  };
  
  module.exports = { 
      getAllJobs, 
      getJob,
      createJob,
      updateJob, 
      deleteJob };
  