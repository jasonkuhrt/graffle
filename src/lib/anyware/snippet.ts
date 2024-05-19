const somethingBetter = something.extend(({ foo }) => {
  // do whatever you want before foo
  const { bar } = await foo({ ...foo.input, customThing: true })
  // do whatever you want after foo/before bar
  const result = await bar({ ...bar.input, moarCustom: true })
  // do whatever you want after foo
  return result
})

// -- Don't need anything before bar? skip it!

const somethingBetter = something.extend(({ bar }) => {
  // do whatever you want before bar
  const result = await bar({ ...bar.input, moarCustom: true })
  // do whatever you want after foo
  return result
})

// -- Don't need anything after foo? skip it!

const somethingBetter = something.extend(({ foo }) => {
  // do whatever you want before foo
  return await foo({ ...foo.input, customThing: true })
})
