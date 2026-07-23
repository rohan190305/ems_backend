import mongoose from "mongoose";

const stateSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }}

, {
    timeStamps :true
})

const state = mongoose.model("State", stateSchema)
export default state