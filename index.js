import express, { Router } from "express"
import db from  "./src/config/db.js"
import cors from "cors"
import dotenv from "dotenv"
import Mongodb from "./src/config/db.js"
import router from "./src/routes/auth.routes.js"
import dept from "./src/routes/department.routes.js"
import states from "./src/routes/state.routes.js"
import city from "./src/routes/city.routes.js"
import emp from "./src/routes/employee.routes.js"
import { errorHandler } from "./src/middleware/error.middleware.js"
import rateLimit from "express-rate-limit"

 dotenv.config()
const app=express();
Mongodb()
const PORT = process.env.PORT || 5000;
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: 'draft-7', // Return standard rate limit info headers
  legacyHeaders: false, // Disable the X-Rate-Limit headers
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.use("/api/auth" , router)
app.use("/api/Dept",dept)
app.use("/api/State", states)
app.use("/api/City" ,city)
app.use("/api/Emp", emp)
app.get("/",(req,res)=>{
  res.json("hello backend")
})
app.use(errorHandler)
app.use(rateLimiter)
await Mongodb(); 

app.listen(PORT,()=>{
  console.log(`server is successfully running on http://localhost:${PORT}`);
})