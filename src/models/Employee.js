import mongoose from "mongoose";


const employeeSchema = mongoose.Schema({
    ProfilePicture:{
        type:String,
       default :""
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase :true,
        unique:true
    },
    phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
},

    gender:{
        type:String,
        required:true,
        enum:['male' , 'female' , 'other'],
        
    },
    address:{
        type:String,
        trim:true
    },
   department: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Department",
  required: true,
},

state: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "State",
  required: true,
},

city: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "City",
  required: true,
},
   
    pincode:{
        type:Number,
        required:true,
        match :[/^[1-9][0-9]{5}$/]     
    },
    isPermanent:{
        type:Boolean,
        default:false
    },


}, {
    timeStamps :true
})

const employee = mongoose.model("Employee", employeeSchema)
export default employee