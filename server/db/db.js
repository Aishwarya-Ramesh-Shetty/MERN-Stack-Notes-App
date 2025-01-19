import mongoose from "mongoose";


const connecttoMongo = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/noteapp')
        console.log('MongoDb connected')
    }
    catch(error){
        console.log('Error connecting to Mongodb',error.message)

    }
}

export default connecttoMongo;