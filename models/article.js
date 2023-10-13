import mongoose from 'mongoose';

const articleSchema = mongoose.Schema(
    {
       heading:{
        type:String,
         required:true
       },
       readTime:{
        type:String,
         required:true

       },
       description:{
        type : String ,
         required:true
       },

       categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category' 

       }],



       image:{
        type:String,
          required:true
       },

       verified:{
        type:Boolean,
         required:true
       },

       newest:{
        type:Boolean,
        required:true
       },

       trending:{
        type:Boolean,
        required:true
       },



    }
)

export const Article = mongoose.model('Article', articleSchema);