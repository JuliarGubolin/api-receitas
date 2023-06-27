import UserService from '../services/UserService.js';

const getAllUsers = async (req, res) => {
    try {
        const user = await UserService.findAllUsers();
        if (!user) {
            return res.status(404).json({ 'message': 'No users found' });
        }
        res.status(200).send(user);
       } catch (error) {
        res.status(500).send({'message': error.message});
       }
    
}

const deleteUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await UserService.findUser(req.params.id)
    if (!user) {
        return res.status(404).json({ 'message': `User ID ${req.params.id} not found` });
    }
    const result = await UserService.deleteUsers(req.params.id);
    res.status(200).send({'message': `Successfully deleted user ${req.params.id}`});
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await UserService.findUser(req.params.id);
    if (!user) {
        return res.status(404).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const update = async (req, res) => {
    const id = req.params.id;
    const update = req.body;

    try {
        const exists = await UserService.existsUser(id);
        if(!exists) return res.status(404).send({'message': 'User not found!'});

        await UserService.updateByIdUser(id, update);
        const updatedUser = await UserService.findUser(id);

        res.status(200).send(updatedUser);
        
    } catch (error) {
        
        res.status(500).send({message: error.message});
    }
}

const addFavoriteRecipe = async (req, res) => {
    const id = req.params.id;
    const newFavoriteRecipe = {
        "idRecipe": req.body.idRecipe,
        "title": req.body.title
        }
        try {
            await UserService.addFavoriteRecipe(id, newFavoriteRecipe);
            const updatedUser = await UserService.findUser(id);
            res.status(200).send(updatedUser);
            
        } catch (error) {
            res.status(500).send({message: error.message})
        }
}
export default {
    getAllUsers,
    deleteUser,
    getUser,
    update,
    addFavoriteRecipe
}
