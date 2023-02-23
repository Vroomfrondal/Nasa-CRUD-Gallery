// Removes last 3 milliseconds from Date.now API for NASA Format.
const unixNow = parseInt(Date.now().toString().slice(0, -3))

export default unixNow
