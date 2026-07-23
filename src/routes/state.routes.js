import express from "express"
import { CreateState, getState } from "../controllers/state.controller.js"
const states = express.Router()

states.post("/createState", CreateState)
states.get("/getState", getState)

export default states