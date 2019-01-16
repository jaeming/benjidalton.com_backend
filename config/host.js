const frontendProd = 'https://benjidalton.com'
const frontendDev = 'http://localhost:8080'
const prod = 'https://api.benjidalton.com'
const dev = 'http://localhost:3000'
const url = process.env.NODE_ENV === 'production' ? prod : dev

const clients = [frontendProd, frontendDev]

export default { url, clients }
