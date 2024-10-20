const userModel = require("../../DB/models/users");
const spekersModel = require("../../DB/models/speakers");
const sessionsModerator = require('../../DB/models/session-moderator')
const axios = require("axios");
const scientific_committees = require("../../DB/models/education-committee");
const jwt= require('jsonwebtoken')
const nodemailer = require('nodemailer'); 
const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'siphaapp@gmail.com',
   pass: 'lazyvrjqagoensfe',
}
    });

    const mailOptions = {
      from: '"SIPHA TEAM" <siphaapp@gmail.com>', 
      to,
      subject,
      html: message 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error('Error sending email:', error);   

   
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email in request body' });
  }

  try {
    const userData = await userModel.findOne({ email });

    if (userData) {
      console.log('Found user:', userData);

      
      let otp = Math.floor(100000 + Math.random() * 900000);
      console.log(otp);
      
      const updateData = await userModel.findOneAndUpdate(
        { _id: userData._id },
        { otp:otp },
        { new: true }
      );

      const userName = userData.email || 'User';

      const emailMessage = `
        <h1>Dear ${userName},</h1>

        <p>Your One-Time Password (OTP) code for verification is: <strong>${otp}</strong></p>

        <p>Please enter this code within [Time Limit] minutes to complete the verification process.</p>

        <p>If you did not request this OTP, please ignore this email.</p>

        <p>Sincerely,</p>
        <p>Sipha Team</p>
      `;

      await sendEmail(email, 'Your OTP Code for Verification', emailMessage);

      res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      console.log('User not found for email:', email);
      res.status(404).json({ error: 'User not found with the provided email' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const fetchUserData = async () => {
  try {
    const response = await axios.get(
      "https://api.vfairs.com/v12/users?access_key=j5o5yeWU3yJ0J5k9EAWxPKPoGv868NpyiykTw"
    );
    const userData = response.data;

   
    userData.forEach(async (user) => {
      const isSaved = await userModel.findOne({ email: user.username });
      if (isSaved) {
        console.log("theData are saved in ourDb");
      } else {
        const newUser = new userModel({
          email: user.username,
          cv_fields:user.cv_fields,
          first_name:user.first_name,
          last_name:user.last_name

        });

        await newUser.save();
        console.log(user.username);
      }
    });

    console.log("User data fetched and saved successfully");
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const addSpeakers = async (req, res) => {
  const { email, name, position, img, experience, workshops } = req.body;
  const addSpeaker = new spekersModel({
    email,
    name,
    position,
    img,
    experience,
    workshops,
  });
  const newSpeaker = await addSpeaker.save();
  res.status(200).send(newSpeaker);
};


const addSessionMod = async (req, res) => {
  const { email, name, linkedinAcc, phoneNumber,isModerator} = req.body;
  const add_sessionsModerator = new sessionsModerator({
    email, name, linkedinAcc, phoneNumber,isModerator
  });
  const new_sessionsModerator = await add_sessionsModerator.save();
  res.status(200).send(new_sessionsModerator);
};

const add_Scientific_committee = async (req, res) => {
  const { name, position, img, role } = req.body;

  const addUser = new Scientific_committee({
    name,
    position,
    img,
    role,
  });

  const added = await addUser.save();
  res.status(200).send(added);
};

const getAll = async (req, res) => {
  const findRequest = await scientific_committees.find({});
  res.status(200).send(findRequest);
  
  
};


const getAllUsers = async(req,res)=>{

  const all_users = await userModel.find({})
  res.status(200).send(all_users)
}
 
const getOneUser = async (req,res)=>{
  const id = req.params.id
  const findUser = await userModel.findById({_id:id})
  res.status(200).send(findUser)
}
const getOneScientific = async (req,res)=>{
  const id = req.params.id
  const getOne = await scientific_committees.findById({_id:id})
  res.status(200).send(getOne)
}



const verification_otp = async (req, res) => {
  const { otp } = req.body; 
  const { email } = req.params;

  if (otp.length !== 6) {
    return res.status(400).send({ message: 'Invalid OTP length. Please provide a 6-digit code.' });
  }

  try {
    const foundUser = await userModel.findOne({email: email});

    if (!foundUser) {
      return res.status(404).send({ message: 'User not found. You need to sign up' });
    }

    const otpMatches =  foundUser.otp

    if (otpMatches != otp) {
      return res.status(400).send({ message: 'Incorrect OTP. Please try again..' });
    }

    const token = jwt.sign(foundUser.toJSON(), "ABC"); 

    return res.status(200).json({ token, User: foundUser }); 

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error});
  }
  
};


module.exports = {
  login,
  fetchUserData,
  addSpeakers,
  add_Scientific_committee,
  getAll,
  getAllUsers,
  getOneScientific,
  getOneUser,
  verification_otp,
  addSessionMod
};


