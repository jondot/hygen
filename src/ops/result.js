module.exports = (type, subject) => (status, payload = null) => ({
  type,
  subject,
  status,
  ...(payload && { payload })
})
