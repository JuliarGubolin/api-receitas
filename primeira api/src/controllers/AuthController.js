import fetch from 'node-fetch';

class AuthController {

    
    static addUser = async(req, res) => {

        const newUser = {
          email: req.body.email,
          password:  req.body.password,
        }
        try {
          const response = await fetch(`http://localhost:3000/auth/register`, {
           method: 'POST',
           body: JSON.stringify(newUser),
           headers: {
             'Content-type': 'application/json'
           }
         });
  
         const jsonResponse = await response.json();
  
           return res.status(200).send(jsonResponse);
           
         } catch (error) {
           res.send(error);
         }  
      }
  
      static login = async(req, res) =>{
  
        const user = { email: req.body.email, password: req.body.password};
  
        try {
          const response = await fetch(`http://localhost:3000/auth/login`, {
           method: 'POST',
           body: JSON.stringify(user),
           headers: {
             'Content-type': 'application/json'
           }
         });
  
          const jsonResponse = await response.json();
           return res.status(200).send(jsonResponse);
           
         } catch (error) {
           res.send(error);
         }  
      }
  
      static logout = async(req, res) =>{
  
        try {
          const response = await fetch(`http://localhost:3000/auth/logout`, {
           method: 'GET',
           headers: {
             'Content-type': 'application/json'
           }
         });
  
        return res.sendStatus(204);
           
         } catch (error) {
            res.status(500).send(error);
         }  
      }
}

export default AuthController;