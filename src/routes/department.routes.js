import express from "express"
import { createDepartment, deleteDept, getDept } from "../controllers/department.controller.js"
const dept = express.Router()

dept.post("/createDept" , createDepartment)
dept.get("/getDept", getDept)
dept.delete("/deleteDept/:id", deleteDept)

export default dept;