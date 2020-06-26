
const regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/
const isURL = url => url.match(regexp) && url.match(regexp)[2]

export default isURL
