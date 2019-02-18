export default {
  unauthorized: (resp) => resp.status(401).json({error: 'User not Authorized'}),
  error: (resp, error) => resp.status(500).json({error})
}
