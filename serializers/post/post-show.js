export const show = (post) => {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author.name,
    date: post.date,
    body: post.body,
    published: post.published,
    comment_count: post.comments.length
  }
}
