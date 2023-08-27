import { useEffect, useState } from 'react'
import axios from 'axios'

import SinglePost from '../SinglePost'
import ImageEditorMain from '../compress/ImageEditorMain.jsx';
import { useNavigate } from 'react-router-dom'


function App() {  

  const [posts, setPosts] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const result = await axios.get("/api/posts")
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
    navigate(`/editImage?imageName=${imageName}&postId=${_id}`);
   
  }

  const postActions = {
    likeClicked,
    commentClicked,
    editPostClicked,
    deletePostClicked,
    editImageClicked
  }


  return (
    <div className="App">

      <div className="flex flex-col space-y-100 items-center divide-y">
        {posts.map(post => (
          <div key={`post-${post._id}`} className="px-5 py-14">

            <SinglePost className="relative" post={post} {...postActions}></SinglePost>
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
