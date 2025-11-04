
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required"
            })
        }

        const userExists = await Employee.findOne({ email })

        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please login."
            })
        }
        let newUser = await Employee.create({
            name,
            email,
            password
        })

        const tokenPayload = {
            _id: newUser._id,
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" })


        const user = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }

        res.status(201).json({
            success: true,
            message: 'Signup Successfull',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to SignUp"
        })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email }).select('+password')

        if (!employee || !(await employee.comparePassword(password))){
            return res.status(400).json({ 
                message: 'Invalid credentials' 
            });
        }

        const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const user = {
            _id: employee._id,
            name: employee.name,
            email: employee.email
        }
        res.status(200).json({ 
            success: true,
            token,
            user
        });

    } catch (error) {
        console.log("Login error:", error);
        
        res.status(400).json({ 
            message: error.message 
        });
    }
};
