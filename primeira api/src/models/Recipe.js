import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        id: {type:Number},
        title: {type:String},
        summary: {type:String},
        readyInMinutes: {type:String},
        servings: {type:Number},
        extendedIngredients: [
            {
                id: {type:Number},
                aisle: {type:String},
                image: {type:String},
                consistency: {type:String},
                name: {type:String},
                nameClean: {type:String},
                original: {type:String},
                originalName: {type:String},
                amount: {type:Number},
                unit: {type:String},
                meta: [String],
                measures: {
                    us: {
                        amount: {type:Number},
                        unitShort: {type:String},
                        unitLong: {type:String}
                    },
                    metric: {
                        amount: {type:Number},
                        unitShort: {type:String},
                        unitLong: {type:String}
                    }
                }
            }
        ],
        instructions: {type:String},
        

    }
);
const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
