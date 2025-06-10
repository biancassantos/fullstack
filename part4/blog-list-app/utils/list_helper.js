const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => total += blog.likes)
  return total
}

const favoriteBlog = (blogs) => {
  let favorite

  if (blogs.length === 0) return 'no favorite'

  blogs.forEach(blog => {
    if (!favorite || blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  const authors = []
  let authorWithMostBlogs

  if (blogs.length === 0) return 'none'

  blogs.forEach(blog => {
    const author = authors.filter(item => item.author === blog.author)[0]

    if (author) {
      author.blogs += 1
    } else {
      authors.push({
        author: blog.author,
        blogs: 1
      })
    }
  })

  authors.forEach(author => {
    if (!authorWithMostBlogs || author.blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = author
    }
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authors = []
  let authorWithMostLikes

  if (blogs.length === 0) return 'none'

  blogs.forEach(blog => {
    const author = authors.filter(item => item.author === blog.author)[0]

    if (author) {
      author.likes += blog.likes
    } else {
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    }
  })

  authors.forEach(author => {
    if (!authorWithMostLikes || author.likes > authorWithMostLikes.likes) {
      authorWithMostLikes = author
    }
  })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}