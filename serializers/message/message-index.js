export const index = (messages) => {
  return messages.map(message => {
    return {
      id: message.id,
      subject: message.subject,
      text: message.text,
      date: message.created,
      from: `${message.from.name} <${message.from.email}>`,
      read: message.read
    }
  })
}
