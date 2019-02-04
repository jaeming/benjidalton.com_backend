import BannedUser from '../models/banned_user'

const banned = async (userId) => {
  const bannedUsers = await BannedUser.find()
  return bannedUsers.find(user => user.id === userId)
}

export default banned
