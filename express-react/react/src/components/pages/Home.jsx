import { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from '../SinglePost';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
const serverUrl = "http://13.48.94.31:8080";

function Home() {
  const [posts, setPosts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const result = await axios.get("http://13.48.94.31:8080/api/posts")
      setPosts(result.data)
    }
    getPosts()
  }, [])

  const likeClicked = async ({_id}) => {
    console.log(`likeClicked = (${_id})`)
  }
  const commentClicked = ({_id}) => {
    console.log(`commentClicked = (${_id})`)
  }
  const editPostClicked = ({_id}) => {
    navigate("/editPost/" + _id)
    console.log(`editPostClicked = (${_id})`)
  }
  const deletePostClicked = async ({_id}) => {
    console.log(`deletePostClicked = (${_id})`)
    await axios.delete("/api/posts/" + _id)
    setPosts(posts.filter(post => post._id !== _id))
  }
  const editImageClicked = ({_id,imageName}) =>{
    console.log(" EditIamge ",imageName)
    console.log(" EditIamgeID ",_id)
    navigate(`/editImage?imageName=${imageName}&id=${_id}`);
   
  }

  const postActions = {
    likeClicked,
    commentClicked,
    editPostClicked,
    deletePostClicked,
    editImageClicked
  }


  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6">
    {posts.map(post => (
      <motion.div
        key={`post-${post._id}`}
        className="max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      >
       <SinglePost className="relative" post={post} {...postActions}></SinglePost>
      </motion.div>
    ))}
  </div>
);
}

export default Home;
