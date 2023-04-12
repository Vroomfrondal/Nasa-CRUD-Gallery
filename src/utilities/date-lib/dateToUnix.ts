const dateToUnix = (dateString: string) => {
  // if date less than 10 chars, add leading 0 on 8th index for Safari Compatability
  if (dateString.length < 10) {
    dateString = `${dateString.slice(0, 8)}0${dateString.slice(8)}`
  }

  return parseInt(new Date(dateString).getTime().toString().slice(0, -3))
}

export default dateToUnix
