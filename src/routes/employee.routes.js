import express from "express"
import { addEmp, deleteById, editEmp, getById, getEmp } from "../controllers/employee.controller.js"
import multer from "multer"
import upload from "../config/multer.js"

const emp=express.Router()

emp.post("/addEmp", upload.single("profilePicture"), addEmp);
emp.get("/getemp",getEmp)
emp.get("/getById/:id", getById)
emp.delete("/deleteById/:id", deleteById)
emp.patch("/editEmp/:id", upload.single("profilePicture"), editEmp)

export default emp