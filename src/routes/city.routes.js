import express from "express"
import { createCity, getCity, getCityById, getCityByState } from "../controllers/city.controller.js"
const city = express.Router()

city.post("/createCity", createCity)
city.get("/getCity" , getCity)
city.get("/getCityById/:id", getCityById)
city.get("/getCityByState/:stateid", getCityByState)

export default city ;