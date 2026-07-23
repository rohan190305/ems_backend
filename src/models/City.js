import mongoose from "mongoose";

const citySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    state:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"State",
        required : true
       
}}, {
    timeStamps :true
})

const city = mongoose.model("City", citySchema)
export default city
