module.exports = {
  prompt: ({ prompter, h }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: "What's your name?",
      })
      .then(({ name }) => {
        return { upperName: h.extended(name) }
      }),
}
