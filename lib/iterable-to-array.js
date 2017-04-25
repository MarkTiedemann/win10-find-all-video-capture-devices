module.exports = iterable => {
  const array = []
  // IIterable: https://docs.microsoft.com/en-us/uwp/api/windows.foundation.collections.iiterable_t_
  const iterator = iterable.first()
  // IIterator: https://docs.microsoft.com/en-us/uwp/api/windows.foundation.collections.iiterator_t_
  while (iterator.hasCurrent) {
    array.push(iterator.current)
    iterator.moveNext()
  }
  return array
}
