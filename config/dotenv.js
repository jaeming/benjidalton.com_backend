import dotenv from 'dotenv'

let envs;
if (process.env.NODE_ENV !== 'production') {
  envs = dotenv.config()
}

export default envs