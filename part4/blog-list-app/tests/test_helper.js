const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: "blog one",
    author: "author one",
    url: "blogone.com",
    likes: 5
  },
  {
    title: "blog two",
    author: "author two",
    url: "blogtwo.com",
    likes: 8
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const testUser = { username: "testlogged", name: "test logged author", password: "testpass" }

const addTestUser = async () => {
  const passwordHash = await bcrypt.hash(testUser.password, 10)
  const user = new User({ username: testUser.username, name: testUser.name, passwordHash })
  await user.save()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  testUser,
  addTestUser
}