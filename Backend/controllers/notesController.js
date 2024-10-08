const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')

//

const getAllNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find().lean()


    if (!notes?.length) {
        return res.status(404).json({ message: `there are no notes sooiciated` })
    }
    return res.json(notes)
    
})
const createNewNote = asyncHandler(async (req, res) => {

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