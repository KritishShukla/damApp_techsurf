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
  imageUrl: String
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
  
    const post = new Post({
      imageName,
      title,
      caption,
      created: new Date(),
      imageUrl:imageUrl
    });
    await post.save();

    const ep = new exiftool.ExiftoolProcess(exiftoolBin);

        // Read metadata from the uploaded buffer
        try {
            const rs = Buffer.from(req.file.buffer); // Convert the buffer to a readable stream
            await ep.open();

            const result = await ep.readMetadata(rs, ['-File:all']);
            const metadata = new MetaDataModel({
                fileName: req.file.originalname, // Use original name or any suitable value
                originalName: req.file.originalname,
                size: req.file.size,
                information: result.data[0]
            });

            await metadata.save();
            console.log("MetaDataTag", metadata);

            await ep.close();
        } catch (error) {
            console.error('Error processing metadata:', error);
            await ep.close();
         }
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

    const imageUrl =await uploadFile(file.buffer, imageName, file.mimetype)
    const prevpost= await Post.findById(imageId)
    console.log("previousPost",prevpost)
    const caption= prevpost.caption
    const post = new Post({
      imageName,
      caption,
      created: new Date(),
      imageUrl:imageUrl
    });

    await post.save();
    res.status(200).json({ s3ImageUrl: imageUrl });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(8080, () => console.log("listening on port 8080"))
