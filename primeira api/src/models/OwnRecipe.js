import mongoose from "mongoose";

const ownRecipe = new mongoose.Schema(
    {
        title: {type:String, required: true},
        description: {type:String, required: true},
        preparationTime: {type:Number, required: true},
        ingredients: [
            {
                name: {type:String},
                quantity: {type:Number, required: true},
                unit: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Unit',
                    
                }
            }]
    }
);
const OwnRecipe = mongoose.model('OwnRecipe', ownRecipe);
export default OwnRecipe;
