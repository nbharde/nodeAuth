const { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser,
    deleteUser,
    getUserByEmail
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUserFunc: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUsersFunc: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserByIdFunc: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateUserFunc: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully",
            })
        })
    },
    deleteUserFunc: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully",
            })
        })
    },
    loginFunc: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Something went wrong"
                });
            }
            if(!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result) {
                results.password = undefined;
                const jsontoken = sign({ result: results}, process.env.JWT_KEY, {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken
                })
            } else {
                return res.status(200).json({
                    success: 0,
                    message: "Invalid email or password",
                })
            }
        })
    },
}