const { Router } = require('express');
const {getUser, putUser, postUser, deleteUser} = require("../controllers/user");

const router = Router();

// router.get('/', (req, res) => {
//     // res.send('Hello world');
//     //We use res.json for return an object. The method status is used for set the status of the response
//     res.status(200).json({
//         msg: 'get API'
//     })
// });

router.get('/', getUser);

router.put('/:id', putUser);

router.post('/', postUser);

router.delete('/', deleteUser);

module.exports = router;
