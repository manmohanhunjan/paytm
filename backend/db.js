const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://manmohan123:6mAnZy38uJMqYnr@manmohanscluster.gkc1ed6.mongodb.net/paytm')
    .then(() => console.log("Db Connected"))
    .catch((error) => console.error(error))

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
})

const UserModal = mongoose.model('User', UserSchema)

module.exports = {
    UserModal
}