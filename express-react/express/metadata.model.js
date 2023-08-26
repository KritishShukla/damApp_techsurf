const mongoose=require('mongoose');

const {Schema,model}=mongoose;

const metaDataSchema=new Schema({
    fileName:{
        type:String,
        required:true,
        index:true
    },
    originalName:{
        type:String
    },
    size:{
        type:Number
    },
    information:{
        type:Object
    }
},{timestamps:true});

const MetaDataModel=model('metadata',metaDataSchema);

module.exports=MetaDataModel;