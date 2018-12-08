export const show = (post) => {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    author: post.author.name,
    date: post.date,
    body: post.body,
    published: post.published
    // comments: post.comments.map(comment => {
    //   return {
    //     id: comment._id,
    //     body: comment.text,
    //     user: comment.author.name
    //   }
    // })
  }
}
