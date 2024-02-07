// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const User = require("../model/User")
// const otpGenerator = require('otp-generator')
// const nodemailer = require('nodemailer')



// const registerController = async (req, res) => {
//     console.log(req.body && req.body.password); // Check if req.body and req.body.password are defined
//     try {
//         const existingUser = await User.findOne({ email: req.body && req.body.email });
//         if (existingUser) {
//             return res.status(200).send({
//                 message: "User already exist",
//                 success: false,
//             })
//         }

//         const password = req.body && req.body.password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt)
//         req.body.password = hashPassword

//         const confrimPassword = await bcrypt.hash(req.body.passwordConfirm, salt)
//         const otp = otpGenerator.generate(6, {
//             digits: true,
//             upperCase: false,
//             specialChars: false,
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//         })
//         req.body.passwordConfirm = confrimPassword
//         if (req.body.password === req.body.passwordConfirm) {
//             const newUser = new User({
//                 name: req.body.name,
//                 email: req.body.email,
//                 profileImage: req.body.profileImage,
//                 password: req.body.password,
//                 passwordConfirm: req.body.passwordConfirm,
//                 otp: otp,
//             })
//             await newUser.save();
//             const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//                 expiresIn: '1d'
//             });

//             const transporter = nodemailer.createTransport({
//                 service: 'Gmail',
//                 auth: {
//                     user: "harshitlathiya19@gmail.com",
//                     pass: "cgvd yrbs jfho zwqb",
//                 }
//             })

//             const mailOptions = {
//                 from: "Auth client webdev warrior",
//                 to: req.body.email,
//                 subject: 'Email Verification Code',
//                 text: `Your verification code is ${otp}`
//             }



//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send("Error sending email...")
//                 }
//                 res.send({
//                     message: "Otp sent to email",
//                 });


//             })
//             return res.status(201).send({
//                 message: "register succesfully",
//                 data: {
//                     user: newUser,
//                     token,
//                 },
//                 success: true,
//             })
//         } else {
//             return res.status(201).send({
//                 message: "password not match ",

//                 success: false,
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send({
//             message: "register error",

//             success: false,
//         })
//     }
// }

// module.exports = { registerController }


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const registerController = async (req, res) => {
    console.log(req.body, "jkhgfhjkl");
    try {
      const existingUser = await User.findOne({
        email: req.body && req.body.email,
      });
      if (existingUser) {
        return res.status(200).send({
          message: "User already exists",
          success: false,
        });
      }
  
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      if (!salt) {
        return res.status(500).send({
          message: "Error generating salt",
          success: false,
        });
      }
  
      const password = req.body && req.body.password;
      if (!password) {
        return res.status(400).send({
          message: "Password is missing in the request body",
          success: false,
        });
      }
  
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
  
      const newConfirmPassword = await bcrypt.hash(
        req.body.confrimPassword,
        salt
      );
      const otp = otpGenerator.generate(6, {
        digits: true,
        upperCase: false,
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
      });
      req.body.confrimPassword = newConfirmPassword;
  
      if (req.body.password === req.body.confrimPassword) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          profileImage: req.body.profileImage,
          password: req.body.password,
          confrimPassword: req.body.confrimPassword,
          otp: otp,
        });
  
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
  
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "harshitlathiya19@gmail.com",
            pass: "cgvd yrbs jfho zwqb",
          },
        });
  
        const mailOptions = {
          from: "Auth client webdev warrior",
          to: req.body.email,
          subject: "Email Verification Code",
          text: `Your verification code is ${otp}`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error sending email...");
          }
          res.send({
            message: "Otp sent to email",
          });
        });
  
        return res.status(201).send({
          message: "Registration successful",
          data: {
            user: newUser,
            token,
          },
          success: true,
        });
      } else {
        return res.status(201).send({
          message: "Password does not match",
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Registration error",
        success: false,
      });
    }
  };

module.exports = { registerController };
    