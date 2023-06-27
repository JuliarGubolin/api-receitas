import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        USER: {
            type: Number,
            default: 2001
        },
        ADMIN: Number,
        VIEWER: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    
    favoriteRecipes: {
       
        idRecipe: {type:String},
        title: {type:String}
    },
    
});

const User = mongoose.model('User', userSchema);

export default User;
