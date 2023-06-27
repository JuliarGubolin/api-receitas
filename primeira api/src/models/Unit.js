import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
    { 
        name: {type:String, required: true}
    }
)
const Unit = mongoose.model('Unit', unitSchema);
export default Unit;
