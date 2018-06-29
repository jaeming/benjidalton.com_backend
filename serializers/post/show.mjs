export const show = (post) => {
  console.log(post)
  return {
    view: 'serialize as benji 1.1',
    main_title: `${post.title} - by ${post.author.name}`,
    comments: post.comments.map(comment => {
      return {
        id: comment._id,
        body: comment.text,
        user: comment.author.name
      }
    }),
    writer: {
      id: post.author._id,
      author_email: post.author.email
    }
  }
}
