const notEmpty = x => x && x.length > 0
const shell = async ({ attributes: { sh }, body }, args, { logger, exec }) => {
  if (notEmpty(sh)) {
    if (!args.dry) {
      await exec(sh, body)
    }
    logger.ok(`       shell: ${sh}`)
  }
}

module.exports = shell
