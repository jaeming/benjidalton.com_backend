import Flickr from 'flickr-sdk'
import { FlickrURL } from '../helpers/flickr_url'

export default {
  async index (req, resp) {
    const flickr = new Flickr(process.env.FLICKR_KEY)
    const result = await flickr.photos.search({
      user_id: '22988619@N08'
    })
    const photos = result.body.photos.photo.map(photo => {
      const {webUrl, imageUrl} = FlickrURL(photo, 'large')
      return {
        title: photo.title,
        webUrl,
        imageUrl
      }
    })
    resp.json(photos)
  }
}
