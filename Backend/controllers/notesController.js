const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')

const getAllNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find().lean()


    if (!notes?.length) {
        return res.status(404).json({ message: `no notes found` })
    }

    //here note.user means notes.id which refers to user.id i.e. notes.user = user.id
    //---------------------------------------------USED THIS----------------------------------------
    const notesWithUser = await Note.find().populate('user', ['roles', 'username']).lean().exec();

    //---------------------------------------------INSTEAD OF THE FOLLOWING-----------------------------
    // const notesWithUser = await Promise.all(notes.map(async (note) => {
    //     const user = await User.findById(note.user).lean().exec()
    //     return { ...note, username: user.username }
    // }))
    //-------------------------------------------both did the same thing except the latter sent extra queries to the db

    return res.json(notesWithUser)
})

const createNewNote = asyncHandler(async (req, res) => {

    const { user, title, text } = req.body

    //confirm the data
    if (!user || !title || !text) {
        return res.status(400).json({ message: "all ields are required" })
    }

    //check for duplicate title

    const duplicateTitle = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateTitle) {
        return res.status(409).json({ message: 'note title already exists' })
    }

    const notesObject = { user, title, text }

    const note = await Note.create(notesObject)

    if (note) {
        res.status(201).json({ message: `New note ${note.title} created successfuly` })
    } else {
        res.status(400).json({ message: 'invalid note data recieved' })
    }

})

const updateNote = asyncHandler(async (req, res) => {

    const { id,user, title, text,completed } = req.body
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: "all ields are required" })
    }
    const note = await Note.findById(id).exec()
    if (!note) {
        return res.status(404).json({ message: 'No Note was found' })
    }

     // Check for duplicate title
     const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

     // Allow renaming of the original note 
     if (duplicate && duplicate?._id.toString() !== id) {
         return res.status(409).json({ message: 'Duplicate note title' })
     }

    note.text = text
    note.title = title
    note.completed = completed
    note.user = user

    await note.save()

    res.json({ message: `notes have been updated to --=-- ${note.text} ` })

})
const deleteNote = asyncHandler(async (req, res) => {

    const {id} = req.body

    if(!id){
        return res.status(400).json({ message: "what are you trying to delete" })
    }

    const note = await Note.findById(id).exec()
    if(!note){
        return res.status(404).json({ message: ` are bhai bhai bhai kya kar rha hai-- note${res.status(404).statusCode} Not Found` });
    }

    await note.deleteOne()
    const reply = `note with title - ${note.title} with ID ${note.id} deleted successfully`
    res.status(200).json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}