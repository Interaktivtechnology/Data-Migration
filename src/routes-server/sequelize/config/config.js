var config = {
    "username": process.env.SwiftDbUser,
    "password": process.env.SwiftDbPass,
    "database": process.env.SwiftDbName,
    "host": process.env.SwiftDbHost,
    "dialect": "mysql",
    logging: false,
}

module.exports = config
