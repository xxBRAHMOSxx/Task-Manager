const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        //here user is now the complete User model, so we cane use every thing User model has
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // automaticly gives us created at and updated at
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: '500',
})

module.exports = mongoose.model('Note', noteSchema);