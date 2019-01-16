const prod = 'https://api.benjidalton.com'
const dev = 'http://localhost:3000'
const url = process.env.NODE_ENV === 'production' ? prod : dev

const clients = ['benjidalton.com', 'api.benjidalton.com', 'localhost']

export default { url, clients }
