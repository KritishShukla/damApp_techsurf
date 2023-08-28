//version1
import express from 'express'
import multer from 'multer'
import crypto from 'crypto'
import mongoose from 'mongoose'; 
import { uploadFile, deleteFile, getObjectSignedUrl } from './s3.js'
import dotenv from 'dotenv'
import exiftoolBin from 'dist-exiftool';
import exiftool from 'node-exiftool';
import cors from 'cors';
import mongo  from 'mongodb';
dotenv.config()

const app = express()

app.use(cors());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
app.use(express.json())

const postSchema = new mongoose.Schema({
  caption: String,
  title: String,
  imageName: String,
  created: Date,
  imageUrl: String,
  lastModified:String,
});

const Post = mongoose.model('Post', postSchema);



const metaDataSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        index: true
    },
    originalName: {
        type: String
    },
    size: {
        type: Number
    },
    information: {
        type: Object
    }
}, { timestamps: true });

const MetaDataModel = mongoose.model('metadata', metaDataSchema);



app.get('/api/getObjectSignedUrl', async (req, res) => {
  const imageName = req.query.imageName;
  
  try {
    const imageUrl = await getObjectSignedUrl(imageName)
    res.send(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    // const posts = await Post.find().sort({ created: -1 }).exec();
    // res.send(posts);
    const posts = await Post.find().sort({ created: -1 }).exec();
    
    for (let post of posts) {
      post.imageUrl = await getObjectSignedUrl(post.imageName)
    }
    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send({ message: "File Not Found", status: 404 });
    }
    
    const file = req.file
    const caption = req.body.caption
    const title = req.body.title;
    const imageName = req.file.originalname
    const imageUrl =await uploadFile(file.buffer, imageName, file.mimetype)
   const date=new Date()
    const post = new Post({
      imageName,
      title,
      caption,
      created:date ,
      imageUrl:imageUrl,
      lastModified:date
    });
    await post.save();
   res.status(201).send(post)
  } catch (error) {
    console.error("Error creating post:", error)
    res.status(500).send({ error: "Internal Server Error" })
  }
})

app.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    await deleteFile(post.imageName);
    await Post.findByIdAndDelete(id);
    res.send(post)
  } catch (error) { 
    console.error("Error deleting post:", error)
  }
})

app.post("/api/upload-to-s3", upload.single('image'),async (req, res) => {
  try {
    const file = req.file
    const imageId = req.body.imageId;
    const imageName = generateFileName()
    console.log("ImageId", imageId)
    if (imageId.match(/^[0-9a-fA-F]{24}$/)){
      var objectId= new mongo.ObjectId(imageId) 
      const prevpost= await Post.findById(objectId)
      console.log("previousPost",prevpost)
      
  
      const newImageUrl =await uploadFile(file.buffer, imageName, file.mimetype)
      console.log("newImageUrl", newImageUrl)
      const post = new Post({
        ...prevpost.toObject(),
        imageName:imageName,
        _id: new mongo.ObjectId(), 
        imageUrl: newImageUrl,
        lastModified: new Date(),
      });
      console.log("newData",post)
      await post.save();
      res.status(200).json({ s3ImageUrl: newImageUrl });
    }
   
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(8080, () => console.log("listening on port 8080"))
