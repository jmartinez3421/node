const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_PRO);

        console.log('DB Connected');
    } catch (err) {
        console.log(err);
        throw new Error('Error initializing the database');
    }
}

module.exports = {
    dbConnection
}
