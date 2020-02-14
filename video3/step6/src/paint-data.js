export function objToTuple(obj) {
  const keys = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

export function removeZeros(tuples) {
  const output = []
  tuples.forEach((tuple) => {
    if (tuple[1] !== 0) output.push(tuple)
  })
  return output
}

export function sortAscending(tuples) {
  return tuples.sort((a,b) => {
    const valueA = a[1]
    const valueB = b[1]
    if (valueA > valueB) return 1
    if (valueA == valueB) return 0
    if (valueA < valueB) return -1
  })
}

export function take(n, tuples) {
  return tuples.slice(0,n)
}