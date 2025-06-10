const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')

const Blog = require('../models/blog')


blogsRouter.get('/', userExtractor, async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
    
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = new Blog({
      title: request.body.title,
      author: user.name,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })

    if (!blog.title || !blog.url) {
      response.status(400).end()
    } else {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    }
    
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    let deletedBlog = null
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString()) {
      deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    }
    
    if (!deletedBlog) {
      response.status(404).end()
    } else {
      response.status(204).end()
    }
    
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedLikes = request.body.likes
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(404).end()
    } else {
      blog.likes = updatedLikes
      const updatedBlog = await blog.save()
      response.status(201).json(updatedBlog)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter