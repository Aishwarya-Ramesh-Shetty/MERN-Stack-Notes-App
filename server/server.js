import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connecttoMongo from './db/db.js'
import noteRouter from './routes/note.js'

const app = express()


app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/notes',noteRouter)

app.listen(5000,()=>{
    connecttoMongo();
    console.log('Server listening on port 5000...')
})