const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany([])
    await helper.addTestUser()
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('all blogs unique identifier is called id', async () => {
    const blogs = await helper.blogsInDb()
    const blogsKeys = []
    for (let key in blogs[0]) {
      if (!blogsKeys.includes(key)) {
        blogsKeys.push(key)
      }
    }

    assert(blogsKeys.includes('id'))
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const user = await api.post('/api/login').send(helper.testUser)

      const newBlog = {
        title: "new blog",
        author: user.body.author,
        url: "test.com",
        likes: 10
      }

      await api
        .post('/api/blogs')
        .set('Auth', `Bearer ${user.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()
      const titles = blogsAtTheEnd.map(b => b.title)

      assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length + 1)

      assert(titles.includes('new blog'))
    })

    test('defaults likes to zero if missing', async () => {
      const user = await api.post('/api/login').send(helper.testUser)

      const newBlog = {
        title: "no likes blog",
        author: user.body.author,
        url: "four.com"
      }

      await api
        .post('/api/blogs')
        .set('Auth', `Bearer ${user.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()
      const postedBlog = blogsAtTheEnd.filter(blog => blog.title === 'no likes blog')[0]

      assert.strictEqual(postedBlog.likes, 0)
    })

    test('fails with status code 404 if title or url is missing', async () => {
      const user = await api.post('/api/login').send(helper.testUser)

      const newBlog = {
        title: "",
        author: user.body.author,
        url: "",
        likes: 3
      }

      await api
        .post('/api/blogs')
        .set('Auth', `Bearer ${user.body.token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtTheEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 401 if token is missing', async () => {
      const user = await api.post('/api/login').send(helper.testUser)

      const newBlog = {
        title: "no token blog",
        author: user.body.author,
        url: "notoken.com"
      }

      await api
        .post('/api/blogs')
        .set('Auth', `Bearer notoken`)
        .send(newBlog)
        .expect(401)

      const blogsAtTheEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const user = await api.post('/api/login').send(helper.testUser)

      const newBlog = {
        title: "new blog",
        author: user.body.author,
        url: "test.com",
        likes: 10
      }
      
      const response = await api.post('/api/blogs').set('Auth', `Bearer ${user.body.token}`).send(newBlog)

      await api
        .delete(`/api/blogs/${response.body.id}`)
        .set('Auth', `Bearer ${user.body.token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(newBlog.title))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const user = await api.post('/api/login').send(helper.testUser)

      await api
        .delete(`/api/blogs/${blogToDelete.id}fail`)
        .set('Auth', `Bearer ${user.body.token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('update of a blog', () => {
    test('succeeds with status code 201 if blog id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 10

      const user = await api.post('/api/login').send(helper.testUser)

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Auth', `Bearer ${user.body.token}`)
        .send(blogToUpdate)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]

      assert.strictEqual(updatedBlog.likes, 10)
    })

    test('fails with status code 400 if blog id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 10

      const user = await api.post('/api/login').send(helper.testUser)

      await api
        .put(`/api/blogs/${blogToUpdate.id}fail`)
        .set('Auth', `Bearer ${user.body.token}`)
        .send(blogToUpdate)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]

      assert.strictEqual(updatedBlog.likes, 5)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})