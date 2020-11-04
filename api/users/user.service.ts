const poolDB = require("../../config/database");

module.exports = {
    createUser: (data, callback) => {
        poolDB.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
                values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if(error)  {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },
    getUsers: callBack => {
        poolDB.query(
            `select id, firstName, lastName, gender, email, number from registration`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserById: (id, callBack) => {
        poolDB.query(
            `select id, firstName, lastName, gender, email, number from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateUser: (data, callBack) => {
        poolDB.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteUser: (data, callBack) => {
        poolDB.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        poolDB.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
}