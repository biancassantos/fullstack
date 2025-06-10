const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

test('dummy returns one', () => {
  assert.strictEqual(dummy([]), 1)
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{title: "test", author: "tester", url: "url.com", likes: 8}]

    assert.strictEqual(totalLikes(blogs), 8)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {title: "test", author: "tester", url: "url.com", likes: 8},
      {title: "test2", author: "tester2", url: "url2.com", likes: 5}
    ]

    assert.strictEqual(totalLikes(blogs), 13)
  })
})


describe('favorite blog', () => {
  test('of empty list is no favorite', () => {
    assert.deepStrictEqual(favoriteBlog([]), 'no favorite')
  })

  test('when list has only one blog equals the blog', () => {
    const blogs = [{title: "test", author: "tester", url: "url.com", likes: 8}]

    assert.deepStrictEqual(favoriteBlog(blogs), {title: "test", author: "tester", url: "url.com", likes: 8})
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {title: "test", author: "tester", url: "url.com", likes: 8},
      {title: "test2", author: "tester2", url: "url2.com", likes: 10}
    ]

    assert.deepStrictEqual(favoriteBlog(blogs), {title: "test2", author: "tester2", url: "url2.com", likes: 10})
  })
})


describe('author with most blogs', () => {
  test('of empty list is none', () => {
    assert.deepStrictEqual(mostBlogs([]), 'none')
  })

  test('when list has only one blog is the only author', () => {
    const blogs = [{title: "test", author: "tester", url: "url.com", likes: 8}]

    assert.deepStrictEqual(mostBlogs(blogs), {author: "tester", blogs: 1})
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {title: "test", author: "tester", url: "url.com", likes: 8},
      {title: "test2", author: "tester2", url: "url2.com", likes: 10},
      {title: "test3", author: "tester2", url: "url3.com", likes: 2}
    ]

    assert.deepStrictEqual(mostBlogs(blogs), {author: "tester2", blogs: 2})
  })
})


describe('author with most likes', () => {
  test('of empty list is none', () => {
    assert.deepStrictEqual(mostLikes([]), 'none')
  })

  test('when list has only one blog is the only author', () => {
    const blogs = [{title: "test", author: "tester", url: "url.com", likes: 8}]

    assert.deepStrictEqual(mostLikes(blogs), {author: "tester", likes: 8})
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {title: "test", author: "tester", url: "url.com", likes: 8},
      {title: "test2", author: "tester2", url: "url2.com", likes: 10},
      {title: "test3", author: "tester2", url: "url3.com", likes: 2}
    ]

    assert.deepStrictEqual(mostLikes(blogs), {author: "tester2", likes: 12})
  })
})