const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../public/upload/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-'+uniqueSuffix+'-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file');

module.exports.uploadFile=(req,res,next)=>{
try {
      upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(400).send({message:"Error: "+err,status:400})
    } else if (err) {
       return res.status(400).send({message:"Error: "+err,status:400})
    }
    next()
  })
} catch (error) {
    next(error);
}
}