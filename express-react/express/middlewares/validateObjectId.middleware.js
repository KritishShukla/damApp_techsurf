const mongoose=require('mongoose');

module.exports.validateObjectId=(req,res,next)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({message:"Invalid Id"});
        }
        next()
    } catch (error) {
        next(error)
    }
}