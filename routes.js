import express from 'express'
import Controllers from './controllers'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'uploads/images' })
const {home, sessions, posts, users, comments, images} = Controllers

router.get('/', (req, res) => home.show(req, res))
router.post('/sessions', (req, res) => sessions.create(req, res))

router.get('/posts', (req, res) => posts.index(req, res))
router.get('/posts/:slug', (req, res) => posts.show(req, res))
router.post('/posts', (req, res) => posts.create(req, res))
router.patch('/posts/:slug', (req, res) => posts.update(req, res))
router.delete('/posts/:slug', (req, res) => posts.delete(req, res))

router.get('/users', (req, res) => users.index(req, res))
router.post('/users', (req, res) => users.create(req, res))
router.put('/users/:id', (req, res) => users.update(req, res))

router.get('/comments', (req, res) => comments.index(req, res))
router.post('/comments', (req, res) => comments.create(req, res))
router.get('/comments/:id', (req, res) => comments.show(req, res))
router.put('/comments/:id', (req, res) => comments.update(req, res))

router.post('/images', upload.single('image'), (req, res) => images.create(req, res))
router.get('/images/:name', (req, res) => images.show(req, res))

export default router
