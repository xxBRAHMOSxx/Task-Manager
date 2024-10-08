const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')

//

const getAllNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find().lean()


    if (!notes?.length) {
        return res.status(404).json({ message: `no notes found` })
    }
    
    //here note.user means notes.id which refers to user.id i.e. notes.user = user.id
    const notesWithUser = await Note.find().populate('user', 'username').lean().exec();

    
    
    return res.json(notesWithUser)
})

const createNewNote = asyncHandler(async (req, res) => {

    const {user, title, text} = req.body

    //confirm the data
    if(!user || !title || !text){
        return res.status(400).json({message:"all ields are required"})
    }

    //check for duplicate title

    const duplicateTitle = await Note.findOne({title}).lean().exec()
    if (duplicateTitle) {
        return res.status(409).json({ message: 'note title already exists' })
    }

    const notesObject = {user,title,text}

    const note = await Note.create(notesObject)

    if (note) {
        res.status(201).json({ message: `New note ${note.title} created successfuly` })
    } else {
        res.status(400).json({ message: 'invalid note data recieved' })
    }

})

const updateNote = asyncHandler(async (req, res) => {

})
const deleteNote = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}