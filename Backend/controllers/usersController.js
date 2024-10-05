const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'User not found' })
    }
    res.json(users)
})

// @desc Create new users
// @route Post /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    //Confirm Data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'already exists' })
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    const userObject = { username, "password": hashedPwd, roles }

    //create and store new user
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created successfuly` })
    } else {
        res.status(400).json({ message: 'invalid user data recieved' })
    }

})

// @desc Update a user
// @route Patch /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {

})

// @desc De;ete a user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}