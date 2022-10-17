import {mongoose} from 'mongoose'

const restrauntSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    foods: {
        type: Number,
        required: true
    },
    staff:{
        type: Number,
        required: true
    },
    delivers: Boolean
});

export const Restraunt = new mongoose.model("restraunt", restrauntSchema)
