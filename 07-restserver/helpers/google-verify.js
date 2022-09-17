const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (token = '') =>  {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    console.log(ticket)

    const { name, picture: img, email } = ticket.getPayload();

    console.log(ticket.getPayload())

    return {
        name,
        img,
        email
    }
}

module.exports = {
    googleVerify
}
