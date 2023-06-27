import User from "../models/User.js"

class UserService {

    static findAllUsers() {
        return User.find();
    }
    
    static deleteUsers(id){
        return User.deleteOne({_id: id});
    }
    
    static findUser(id){
        return User.findById(id, '-password').exec();
    }
    

    static updateByIdUser(id, update){
       return User.findByIdAndUpdate({_id: id}, {$set: update});
    }

    static existsUser(id){
        return User.exists({_id: id});
    }

    static addFavoriteRecipe(id, recipe){
        
        return User.findOneAndUpdate({_id: id},{$push: { favoriteRecipes: recipe } });
    }
}

export default UserService;
