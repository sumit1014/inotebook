import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import fetchuser from '../middleware/fetchuser.js';
const JWT_SECRET = "hellopeople000";


//ROUTE:1. create user using : POST "api/auth/creatuser" 
router.post('/createuser',[
    body('name', 'name is required and at least 5 character long').notEmpty().isLength({min:5}),
    body('email', 'valid email is required and should be unique').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async(req,res)=>{
    let success = false;
     // Check for validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ success,errors: errors.array() });
     }  
    try {
        // Check if user is already exist or not
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:"user already exist on this email"})
        }

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 

        // Check if req.body is defined (after configuring middleware)
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword // Save the hashed password
        });
        const savedUser = await user.save();  // Save user and get saved document back
        console.log('User saved:', savedUser); // Check the saved user in logs

         // Generate JWT Token
         const data = {
            user: {
                id: savedUser._id // Use user ID as payload
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET); // Token expires in 1 hour
        console.log(authToken)
        //res.status(201).json(savedUser);
        success = true;
        res.json({ success,authToken });// return token
        // catch errors
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


//ROUTE:2. authenticate user using : POST "api/auth/loginuser" 
router.post('/loginuser',[
    body('email', 'valid email is required and should be unique').isEmail(),
    body('password', 'Password must be at least 5 characters long').exists()
], async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success,error:"please provide valid credentials"});
        }
        //compare password if it matches
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success,error:"please provide valid credentials"});
        }
        const data = {
            user: {
                id: user.id // Use user ID as payload
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET); // Token 
        success = true;
        res.json({ success, authToken });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


//ROUTE:3. get loggedIn user details : POST "api/auth/getuser" 
router.post('/getuser', fetchuser, async(req,res)=>{
try{
    let userID = req.user.id;
    const user = await User.findById(userID).select("-password")
    res.send(user);
}catch(error){
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
}
})

export default router;