import React, { useEffect, useState } from "react";
import axios from "axios";
import Body from "../Components/Body";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1000/api/auth/posts",{withCredentials:true})
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className='heading'>
        <h1>Welcome to My Blog</h1>
        <p>Your daily dose of tech insights and stories</p>
      </div>

      {posts.map(post => (
        <Body key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
