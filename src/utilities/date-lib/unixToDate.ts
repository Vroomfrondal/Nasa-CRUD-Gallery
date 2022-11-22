const unixToDate = (unix: number) => {
  const cDate = new Date(unix * 1000)
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const year = cDate.getFullYear()
  const month = months[cDate.getMonth()]
  const day = cDate.getDate()

  const nasaDateFormat = `${year}-${month}-${day}`
  return nasaDateFormat
}

export default unixToDate
