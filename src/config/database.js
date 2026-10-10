const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rishabh7rz_db_user:sQvD3OZWVA8OsLde@devconnect.eeymul2.mongodb.net/DevConnect');
}

module.exports = connectDB;