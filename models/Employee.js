const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

employeeSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

employeeSchema.methods.comparePassword = async function(candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("Employee", employeeSchema)