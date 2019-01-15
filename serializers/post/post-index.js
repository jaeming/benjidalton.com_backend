export const index = (posts) => {
  return posts.map((post) => {
    return {
      id: post._id,
      slug: post.slug,
      title: post.title,
      body: post.body,
      author: post.author.name,
      comment_count: post.comments.length,
      date: post.date,
      summary: post.summary || post.body
    }
  })
}
