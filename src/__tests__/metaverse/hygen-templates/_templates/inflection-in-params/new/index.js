module.exports = {
  params: ({ args, h }) => {
    return { pluralizedName: h.inflection.pluralize(args.name) }
  },
}
