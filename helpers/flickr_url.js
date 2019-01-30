export const FlickrURL = (data, size = 'medium') => {
  const farm = `farm${data.farm}`
  const server = `.staticflickr.com/${data.server}`
  const id = `/${data.id}`
  const secret = `_${data.secret}`
  const sizes = {
    small: 'n',
    medium: 'z',
    large: 'b'
  }
  const webUrl = `https://www.flickr.com/photos/jaeming${id}`
  const imageUrl = `https://${farm}${server}${id}${secret}_${sizes[size]}.jpg`
  return {webUrl, imageUrl}
}
