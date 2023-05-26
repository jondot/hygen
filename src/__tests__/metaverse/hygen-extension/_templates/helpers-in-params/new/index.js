module.exports = {
  params: ({ args, h }) => {
    return { upperName: h.extended(args.name) }
  },
}
