module.exports = (type, subject, start = new Date()) => (
  status,
  payload = null,
  end = new Date()
) => ({
  type,
  subject,
  status,
  timing: end - start,
  ...(payload && { payload })
})
