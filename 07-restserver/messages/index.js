const Correct = require('./correct');
const Errors = require('./errors');
const standartResponses = require('./standartResponses');

module.exports = {
    Correct,
    Errors,
    ...standartResponses
}
