export default (type, subject, start = new Date()) => (
  status,
  payload = null,
  end = new Date(),
) => ({
  type,
  subject,
  status,
  timing: end.getTime() - start.getTime(),
  ...(payload && { payload }),
})
