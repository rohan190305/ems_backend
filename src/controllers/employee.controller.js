import employee from "../models/Employee.js"

export const addEmp = async (req, res) => {
    try {

        console.log("Content-Type:", req.headers["content-type"]);
        console.log("File:", req.file);
        console.log("Body:", req.body);

        const {
            name,
            email,
            phone,
            gender,
            address,
            city,
            state,
            pincode,
            isPermanent,
            department
        } = req.body;

        const ProfilePicture = req.file ? req.file.path : "";

        console.log("Saved Path:", ProfilePicture);

        const CreateEmp = await employee.create({
            ProfilePicture,
            name,
            email,
            phone,
            gender: gender.toLowerCase(),
            address,
            city: city || undefined,
            state: state || undefined,
            pincode,
            isPermanent,
            department: department || undefined
        });

        return res.status(201).json({
            message: "Employee created successfully",
            employee: CreateEmp
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};
export const getEmp = async(req, res)=>{
    try {
        const Emp = await employee.find().populate("department" , "name").populate("city","name").populate("state", "name")
        if(!Emp){
            return res.status(400).json({message:"employee not found"})
        }
        return res.status(200).json({message:"employee found successfully", Emp})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

export const getById = async(req, res)=>{
    try {
        const {id} = req.params
        const EmpById = await employee.findById(id).populate("department", "name").populate("state", "name").populate("city", "name")
        if(!EmpById){
            return res.status(400).json({message:"employee not found"})
        }
        return res.status(200).json({message:"employee found successfully", EmpById})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

export const deleteById = async(req ,res)=>{
    try {
        const {id} = req.params
        const DeletedEmp = await employee.findByIdAndDelete(id)
        if(!DeletedEmp){
            return res.status(400).json({message:"employee not found"})
        }
        return res.status(200).json({message:"employee deleted successfully", DeletedEmp})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
        
    }
}

export const editEmp = async(req, res)=>{
    try {
        const {id} = req.params
        const { name, email, phone, gender, address, city, state, pincode, isPermanent, department } = req.body
        const ProfilePicture = req.file ? req.file.path : undefined

        const updateFields = {
            name, email, phone,
            gender: gender?.toLowerCase(),
            address,
            city: city || undefined,
            state: state || undefined,
            pincode,
            isPermanent,
            department: department || undefined
        }
        if (ProfilePicture) updateFields.ProfilePicture = ProfilePicture

        const UpdatedEmp = await employee.findByIdAndUpdate(id, updateFields, { new: true })
            .populate("department", "name")
            .populate("state", "name")
            .populate("city", "name")

        return res.status(200).json({message:"employee updated successfully", UpdatedEmp})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error"})
    }
}