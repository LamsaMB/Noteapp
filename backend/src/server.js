import express from 'express';
import noteRoutes from './routes/noteRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'

const app = express();

const port = process.env.PORT || 5001;


//Middleware
app.use(cors({
    origin : "http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter);


// app.use((req,res,next)=>{
//     console.log(`requete de type ${req.method} et url ${req.url}`);
//     next(); // pour dire de passer au middleware suivant
//     });

app.use('/api/note', noteRoutes);

connectDB().then(() => {

    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }) 
})



