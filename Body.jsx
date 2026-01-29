import React from 'react'
import './Body.css'
import {Link} from 'react-router-dom'
const Body = ({ post }) => {
  return (
    <div className="post-card">

      <Link to={`/post/${post._id}`}><h2>{post.title}</h2></Link>

      {post.image && (
        <Link to={`/post/${post._id}`}>
        <img 
          src={`http://localhost:1000/${post.image}`} 
          alt="pic"
          width="400"
        />
        </Link>
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
    </div>
  )
}

export default Body
