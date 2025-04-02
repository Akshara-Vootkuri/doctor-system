// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb';
// // App configuration
// const app = express();
// const port = process.env.PORT || 4000;
// connectDB()

// // Middleware
// app.use(express.json());
// app.use(cors());

// // API Endpoints
// app.get('/', (req, res) => {
//     res.send('Helloo guys');
// });

// // Start server
// app.listen(port, () => console.log(`Server started on port ${port}`));
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // Ensure correct path and `.js` extension if using ES modules
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database
connectDB();
connectCloudinary();
// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send('Helloo guys');
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
