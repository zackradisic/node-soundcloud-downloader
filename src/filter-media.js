
const filterMedia = (media, predicateObj) => {
  return media.filter(({ format }) => {
    let match = false
    if (predicateObj.protocol) match = format.protocol === predicateObj.protocol
    if (predicateObj.format) match = format.mime_type === predicateObj.format
    return match
  })
}

export default filterMedia
