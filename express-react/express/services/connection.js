const mongoose=require('mongoose')

module.exports=mongoose.connect('mongodb://localhost:27017/metadata').then((conn)=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log("Database not connected");
});