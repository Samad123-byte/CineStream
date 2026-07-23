import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//register
export const registerUser = async (req, res) => {

try {

const {name, email, password} = req.body;

if(!name || !email || !password) {

return res.status(400).json({message: "ALL FEILDS MUST BE FILLED"})

}

const existingUser = await User.findOne({email})

if(existingUser) {

return res.status(400).json({message: "EMAIL IS ALREADY EXISTS"})

}


const user = await User.create({

    name,

    email,

    password

});

return res.status(201).json({
success: true,
message: "User you are Successfully Register",
user

})
    
} catch (error) {

console.error(error.message)

res.status(500).json({
message: "Server error"
})

}

}

//login 

export const loginUser = async (req,res) => {

try {

const {email, password} = req.body;

if(!email || !password) {

return res.status(400).json({
message: "KINDLY FILL ALL THE FIELDS"
})

}

const user = await User.findOne({email})

if(!user) {

return res.status(400).json({
message: "FUcking dumbass wrong email or password"
})

}

const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch) {

return res.status(400).json({
message: "FUcking dumbass wrong email or password"
})

}

const token = generateToken(user._id);

res.status(201).json({

success: true,

message: "YOU ARE LOGIN SUCCESSFULLY",
token,

user: {

id: user._id,
  name: user.name,

email: user.email,

avatar: user.avatar,

role: user.role,
}

})
    
} catch (error) {
 
  console.log(error);

        res.status(500).json({

            message: "Server Error"

        });


}

}