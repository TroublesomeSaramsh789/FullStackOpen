import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog)
  }

  const allowRemove = (blogUserId) => {
    const user = blogService.getUserInfo()
    return blogUserId === user.id
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLike}>like</button>
          </p>
          <p>{blog.author}</p>
          {allowRemove(blog.user.id) && (
            <button
              style={{
                backgroundColor: 'blue',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleRemove}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
