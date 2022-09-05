const {Schema} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
});

module.exports = RoleSchema;
