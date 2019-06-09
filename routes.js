import express from 'express'
import Controllers from './controllers'
import { Upload } from './config/uploader'
import Auth from './lib/auth'
import Policy from './lib/policy'

const router = express.Router()
const {home, sessions, posts, users, comments, images, imagesFlickr, songs, messages, contacts} = Controllers

router.get('/', home.show)

// sessions
router.post('/sessions', sessions.create)

// users
router.get('/users', users.index)
router.post('/users', users.create)
router.put('/users/:id', users.update)

// posts
router.get('/posts', posts.index)
router.get('/posts/:slug', posts.show)
router.post('/posts', Auth.user, Policy.check(['admin']), posts.create)
router.patch('/posts/:slug', Auth.user, posts.update)
router.delete('/posts/:slug', Auth.user, posts.delete)

// comments
router.get('/comments', comments.index)
router.get('/comments/:id', comments.show)
router.post('/comments', Auth.user, Policy.check(['commenter']), comments.create)
router.put('/comments/:id', Auth.user, Policy.check(['commenter']), comments.update)

// images
router.post('/images', Auth.user, Policy.check(['admin']), Upload.single('image'), images.create)
router.get('/images/flickr', imagesFlickr.index)

// songs
router.post('/songs', Auth.user, Policy.check(['admin']), Upload.array('songs', 12), songs.create)
router.get('/songs', songs.index)
router.get('/songs/:slug', songs.show)

// messages
router.get('/messages', Auth.user, messages.index)
router.get('/messages/:id', Auth.user, messages.show)
router.post('/messages', Auth.user, Policy.check(['messenger']), messages.create)
router.put('/messages/:id', Auth.user, Policy.check(['messenger']), messages.update)
router.delete('/messages/:id', Auth.user, Policy.check(['messenger']), messages.delete)

// contacts
router.post('/contacts', contacts.create)

export default router
