// import express from "express"
// import dotenv from "dotenv"
// import connectDB from "./database/db.js"
// import userRoute from "./routes/user.route.js"
// import blogRoute from "./routes/blog.route.js"
// import commentRoute from "./routes/comment.route.js"
// import cookieParser from 'cookie-parser';
// import cors from 'cors'
// import path from "path"

// dotenv.config()
// const app = express()

// const PORT = process.env.PORT || 3000


// // default middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({extended:true}));
// app.use(cors({
//     origin: "http://localhost:5173", // Adjust this to your frontend URL
//     credentials:true
// }))

// const _dirname = path.resolve()

// // apis
//  app.use("/api/v1/user", userRoute)
//  app.use("/api/v1/blog", blogRoute)
//  app.use("/api/v1/comment", commentRoute)

//  app.use(express.static(path.join(_dirname,"/frontend/dist")));
//  app.get("*", (_, res)=>{
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
//  });

// app.listen(PORT, ()=>{
//     console.log(`Server listen at port ${PORT}`);
//     connectDB()
// })

import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// CORS Configuration
// Note: If you deploy your Frontend to Vercel/Netlify later, 
// you will need to add that URL here in place of localhost.
app.use(cors({
    // Allow both your local frontend AND your deployed frontend (if you have one)
    origin: ["http://localhost:5173", "https://blog-webapp-frontend.vercel.app"], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));


// Apis
app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

// ----------------------------------------------------------------------
// FIXED: Removed frontend static serving to prevent Render crash
// The backend now acts 100% as an API server.
// ----------------------------------------------------------------------

app.listen(PORT, ()=>{
    console.log(`Server listen at port ${PORT}`);
    connectDB()
})