
const filterFormats = (info, predicateObj) => {
  return info.filter(({ format }) => {
    let match = false
    if (predicateObj.protocol) match = format.protocol === predicateObj.protocol
    if (predicateObj.format) match = format.mime_type === predicateObj.format
    return match
  })
}

export default filterFormats
