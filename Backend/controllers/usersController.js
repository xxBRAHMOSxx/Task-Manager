const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
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
    if (!username || !password) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd }
        : { username, "password": hashedPwd, roles }

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
const updateUser = asyncHandler( async (req, res) => {
    const { id, username, roles, active, password } = req.body

    //confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    //check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    //Allow updates to oiriginal user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'username already exists' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        //Hash password
        user.password = await bcrypt.hash(password, 10)
    }
    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated` })
})

// @desc De;ete a user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    //confirm data
    if (!id) {
        return res.status(400).json({ message: 'User id required' })
    }
    //does user still have assigned notes
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    await user.deleteOne()
    const reply = `Username ${user.username} with ID ${user.id} deleted successfully`
    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}