import aws from 'aws-sdk'

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_KEY,
  accessKeyId: process.env.S3_KEY_ID,
  region: process.env.S3_REGION
})

export { aws }
