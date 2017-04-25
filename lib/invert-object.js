module.exports = object =>
  Object.entries(object)
  .reduce((acc, [key, value]) => {
    // switch key and value
    acc[value] = key
    return acc
  }, {})
