import mongoose from "mongoose";

const departMent = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
    

}, {
    timeStamps :true
})

const department = mongoose.model("Department", departMent)
export default department