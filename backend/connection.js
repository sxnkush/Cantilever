const mongoose = require("mongoose")

async function connectMongoose(task)
{
    return mongoose.connect(task)
}

module.exports = {
    connectMongoose
}