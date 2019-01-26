import Flickr from 'flickr-sdk'

const flickrURL = (p) => {
  const farm = `farm${p.farm}`
  const server = `.staticflickr.com/${p.server}`
  const id = `/${p.id}`
  const secret = `_${p.secret}`
  return `https://${farm}${server}${id}${secret}.jpg`
}

export default {
  async index (req, resp) {
    const flickr = new Flickr(process.env.FLICKR_KEY)
    const result = await flickr.photos.search({
      user_id: '22988619@N08'
    })
    const photos = result.body.photos.photo
    resp.json(photos.map(photo => ({
      title: photo.title,
      url: flickrURL(photo)
    })))
  }
}
