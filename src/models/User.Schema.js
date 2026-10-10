const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
        match: [/^[a-zA-Z\s-]+$/, "Name can only contain letters, spaces, and hyphens"],
        minLength: [3, "First Name must be at least 3 characters long"],
        maxLength: [30, "First Name must be at most 30 characters long"]
    },
    lastName: {
        type: String,
        trim: true,
        match: [/^[a-zA-Z\s-]+$/, "Name can only contain letters, spaces, and hyphens"],
        minLength: [3, "Last Name must be at least 3 characters long"],
        maxLength: [30, "Last Name must be at most 30 characters long"]
    },
    emailID: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        maxLength: [100, "Email ID cannot exceed 100 characters"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid email address");
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
        maxLength: [128, "Password cannot exceed 128 characters"]
    },
    age: {
        type: Number,
        min: [16, "Age must be at least 16"],
        max: [120, "Please enter a valid human age (max 120)"]
    },
    gender: {
        type: String,
        lowercase: true,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a supported gender"
        }
        // validate(value) {
        //     if (!["male", "female", "other"].includes(value.toLowerCase())) {
        //         throw new Error("Gender Must be either male, female or other");
        //     }
        // }
    },
    photoUrl: {
        type: String,
        default: "https://img.icons8.com/fluent/1200/user-male-circle.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL");
            }
        }
    },
    about: {
        type: String,
        trim: true,
        default: "Hey there! I am using DevConnect",
        maxLength: [500, "About section cannot exceed 500 characters"]
    },
    skills: {
        type: [{
            type: String,
            trim: true,
            maxLength: [50, "A single skill cannot exceed 50 characters"]
        }],
        default: [],
        validate: [
            {
                validator: function (skillsArray) {
                    return skillsArray.length <= 15;
                },
                message: "You can only specify up to 15 skills"
            }
        ]
    }

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;