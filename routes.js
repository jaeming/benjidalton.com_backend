import express from 'express'
import Controllers from './controllers'
import { Upload } from './config/uploader'
import Auth from './lib/auth'
import Policy from './lib/policy'

const router = express.Router()
const {home, sessions, posts, users, comments, images, imagesFlickr, songs, messages} = Controllers

router.get('/', (req, res) => home.show(req, res))

// sessions
router.post('/sessions', (req, res) => sessions.create(req, res))

// users
router.get('/users', (req, res) => users.index(req, res))
router.post('/users', (req, res) => users.create(req, res))
router.put('/users/:id', (req, res) => users.update(req, res))

// posts
router.get('/posts', (req, res) => posts.index(req, res))
router.get('/posts/:slug', (req, res) => posts.show(req, res))
router.post('/posts', Auth.user, Policy.check(['admin']), (req, res) => posts.create(req, res))
router.patch('/posts/:slug', Auth.user, (req, res) => posts.update(req, res))
router.delete('/posts/:slug', Auth.user, (req, res) => posts.delete(req, res))

// comments
router.get('/comments', (req, res) => comments.index(req, res))
router.get('/comments/:id', (req, res) => comments.show(req, res))
router.post('/comments', Auth.user, Policy.check(['commenter']), (req, res) => comments.create(req, res))
router.put('/comments/:id', Auth.user, Policy.check(['commenter']), (req, res) => comments.update(req, res))

// images
router.post('/images', Auth.user, Policy.check(['admin']), Upload.single('image'), (req, res) => images.create(req, res))
router.get('/images/flickr', (req, res) => imagesFlickr.index(req, res))

// songs
router.post('/songs', Auth.user, Policy.check(['admin']), Upload.array('songs', 12), (req, res) => songs.create(req, res))
router.get('/songs', (req, res) => songs.index(req, res))
router.get('/songs/:slug', (req, res) => songs.show(req, res))

// messages
router.get('/messages', Auth.user, (req, res) => messages.index(req, res))
router.get('/messages/:id', Auth.user, (req, res) => messages.show(req, res))
router.post('/messages', Auth.user, Policy.check(['messenger']), (req, res) => messages.create(req, res))
router.put('/messages/:id', Auth.user, Policy.check(['messenger']), (req, res) => messages.update(req, res))
router.delete('/messages/:id', Auth.user, Policy.check(['messenger']), (req, res) => messages.delete(req, res))

export default router
