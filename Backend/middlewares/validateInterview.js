import { INTERVIEW_STATUS } from "../config/constants.js" // <-- fix this

export const validateInterview = (req, res, next) => {
  const { candidateId, title, scheduledDate, duration } = req.body
  if (!candidateId || !title || !scheduledDate || !duration) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  req.validatedData = { ...req.body }
  next()
}

export const validateInterviewStatus = (req, res, next) => {
  const { status, notes } = req.body

  if (!status) {
    return res.status(400).json({ error: "Status is required" })
  }

  // Get allowed status values from your constants
  const allowedStatus = Object.values(INTERVIEW_STATUS)
  if (!allowedStatus.includes(status)) {
    return res
      .status(400)
      .json({ error: `Status must be one of: ${allowedStatus.join(", ")}` })
  }

  req.validatedData = { status, notes: notes || null }
  next()
}
