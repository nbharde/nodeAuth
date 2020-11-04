const { 
    createUserFunc,
    updateUserFunc,
    deleteUserFunc,
    getUsersFunc,
    getUserByIdFunc,
    loginFunc
} = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', checkToken, createUserFunc);
router.patch('/', checkToken, updateUserFunc);
router.delete('/', checkToken, deleteUserFunc);
router.get('/', checkToken, getUsersFunc);
router.get('/:id', checkToken, getUserByIdFunc);
router.post('/login', loginFunc);

module.exports = router;