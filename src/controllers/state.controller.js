import state from "../models/State.js"


export const CreateState = async(req , res)=>{
    try {
        const {name} = req.body
        if (!name?.trim()) {
            return res.status(400).json({message: "State name is required"})
        }
        const State = await state.create({name})
        return res.status(201).json({message: "state created successfully", State})
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({message: "State already exists"})
        }
        return res.status(500).json({message: error.message})
    }
}

export const getState = async(req,res)=>{
    try {
        const State = await state.find()
        if(!State){
            return res.status(400).json({message:"state not found"})
        }
        return res.status(200).json({message:"state found successfully", State})

    } catch {
        return res.status(500).json({message:"internal server error"})
        
    }
}
