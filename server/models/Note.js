import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

const note = mongoose.model('note',NoteSchema)
export default note