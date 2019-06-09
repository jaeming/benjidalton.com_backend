import multer from 'multer'
import multerS3 from 'multer-s3'
import { aws } from './aws'

const s3 = new aws.S3()

const Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: process.env.S3_ACL,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

export { Upload }
