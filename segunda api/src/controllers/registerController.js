import User from '../models/User.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const { email,  password } = req.body;
    if (!email) return res.status(400).json({ 'message': 'E-mail is required.' });
    if (!password) return res.status(400).json({ 'message': 'Password is required.' });

    const duplicate = await User.findOne({ email: email }).exec()
    if (duplicate) { 
        return res.status(409).json({ 'message': `Conflict` });
    } 
    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await User.create({ 
            "email": email, 
            "password": hashedPwd 
        });
        
        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

export default { handleNewUser };
