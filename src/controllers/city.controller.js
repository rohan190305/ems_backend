import city from "../models/City.js"

export const createCity = async(req , res)=>{
    try {
        const {name, state} = req.body
        if (!name || !state) {
            return res.status(400).json({message: "name and state are required"})
        }
        const City = await city.create({name, state})
        return res.status(201).json({message: "city created successfully", City})
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({message: "city already exists"})
        }
        return res.status(500).json({message: error.message})
    }
}

export const getCity = async(req,res)=>{
    try {
        const City = await city.find().populate("state")
        if(!City){
            return res.status(400).json({message:"city not found"})
        }
        return res.status(200).json({message:"city found successfully", City})

    } catch (error) {
        return res.status(500).json({message:"internal server error"})
        
    }
}


export const getCityById = async(req, res)=>{
    try {
        const {id} = req.params
        const City = await city.findById(id).populate("state")
        if(!City){
            return res.status(400).json({message:"city not found"})
        }
        return res.status(200).json({message:"city found successfully", City})

    } catch (error) {
        return res.status(500).json({message:"internal server error"})

    }
}

export const getCityByState = async(req ,res )=>{
    try {
        const {stateid} = req.params
        const cities = await city.find({state: stateid})
        return res.status(200).json({message:"cities found successfully", cities})
    } catch (error) {
        return res.status(500).json({message:"internal server error"} )
    }
}