
const serverErrorResponse = (res) => {
    res.status(500).json({
        msg: Errors.serverError
    })
}

module.exports = {
    serverErrorResponse
}
