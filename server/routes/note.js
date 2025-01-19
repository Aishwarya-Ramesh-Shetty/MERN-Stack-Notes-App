import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()


router.post('/add',middleware,async(req,res) =>{
    try{
        const {title,description} = req.body

        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        })

        await newNote.save()

        return res.status(200).json({success:true,message:"Note added successfully"})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,message:"Error in Adding note"})

    }

})


router.get('/',middleware, async(req,res) =>{
    try{
        const notes = await Note.find({userId:req.user.id})
        return res.status(200).json({success:true,notes,message:"Note found"})

    }catch(error){
        return res.status(500).json({success:false,message:"Note not found"})
        console.log(error.message)
    }
})

router.put("/:id", async(req,res) =>{
    try{
        const {id} = req.params
        const updateNote = await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true,updateNote,message:"Successfully Updated"})

    }catch(error){
        return res.status(500).json({success:false,message:"Unsuccessfully Updation"})
        console.log(error.message)
    }
})


router.delete("/:id", async(req,res) =>{
    try{
        const {id} = req.params
        const deleteNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({success:true,deleteNote,message:"Note deleted successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Note cannot be deleted"})
    }
})

export default router