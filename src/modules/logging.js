
module.exports = {
  hooks: {
    yargsOptionParsers: [
      chain => chain
        .group('Screen visibility')
        .number('logLevel')
        .describe('log level between 1(trace) and 5(silent)')

        .boolean('trace')
        .describe('show absolutely every thing going on (long!)')

        .boolean('debug')
        .describe('show summaries of data')

        .boolean('verbose')
        .alias('v', 'verbose')
        .alias('log','verbose')
        .alias('ok','verbose')
        .alias('log','verbose')
        .describe('verbose', 'Extra information, default setting')

        .boolean('quiet')
        .alias('q', 'quiet')
        .describe('quiet', 'Show only warnings and errors')

        .boolean('warning')
        .alias('w', 'warning')
        .describe('warning', 'Show warnings')

        .boolean('error')
        .alias('err','error')
        .describe('error', 'show only error messages')

        .boolean('silent')
        .alias('s','silent')
        .describe('show no output')

        .global('trace','debug','verbose','quiet','warning','error','silent')
    ]
  }
}
