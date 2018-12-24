import truncate from 'html-truncate'

export const index = (posts) => {
  return posts.map((post) => {
    return {
      id: post._id,
      slug: post.slug,
      title: post.title,
      author: post.author.name,
      comment_count: post.comments.length,
      date: post.date,
      preview: truncate(post.body, 30)
    }
  })
}
