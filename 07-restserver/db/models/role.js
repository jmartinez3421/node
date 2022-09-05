const { model } = require('mongoose');
const RoleSchema = require('./schemas/roleSchema');

const Role = model('role', RoleSchema);

module.exports = Role;
