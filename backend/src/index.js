import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRouter from './routes/auth.router.js';

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());
app.use(cookieParser()); // parse incoming cookies
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
}

app.use('/api/auth', authRouter);

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
});
