const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// Define the user schema
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address",
        },
    },
    role: {
        type: String,
        enum: ["admin", "user", "guid", "lead-guid"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    changedPasswordAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    // Update changedPasswordAt field only if the password has been changed
    this.changedPasswordAt = Date.now();
    next();
});

// Method to compare passwords
userSchema.methods.comparePasswords = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.changedPasswordAt) {
        const changedTimestamp = parseInt(this.changedPasswordAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken);
    return resetToken;
};

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
