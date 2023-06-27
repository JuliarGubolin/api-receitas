import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ 'message': 'E-mail is required.' });
    if (!password) return res.status(400).json({ 'message': 'Password is required.' });

    const foundUser = await User.findOne({ email: email }).exec()
    if (!foundUser) return res.status(401).json({'message': 'Unregistered user'}); 
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles)
        
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '6000s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.json({accessToken});
    } else {
        res.sendStatus(401);
    }
}

export default  { handleLogin } ;
