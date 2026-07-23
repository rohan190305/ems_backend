import express from "express"
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
const app = express();
const PORT = process.env.PORT || 5000;

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.use("/api/auth", router)
app.use("/api/Dept", dept)
app.use("/api/State", states)
app.use("/api/City", city)
app.use("/api/Emp", emp)
app.get("/", (req, res) => res.json("hello backend"))
app.use(rateLimiter)
app.use(errorHandler)

Mongodb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is successfully running on http://localhost:${PORT}`);
  })
})