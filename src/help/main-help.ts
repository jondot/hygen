/**
 * Get help text
 *
 * @returns {string} help text
 */
export function mainHelp() {
  return `
Usage:
  hygen [option] GENERATOR ACTION [--name NAME] [data-options]

Options:
  -h, --help         # Show this message and quit
  --help-templates   # Show help regarding template helpers
  --dry              # Perform a dry run.  Files will be generated but not saved.
`
}
