const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the user, required
    email: { type: String, required: true, unique: true }, // Email, required and must be unique
    password: { type: String, required: true, minlength: 8}, // Password, required with a minimum length of 8
    created_at: { type: Date, default: Date.now }, // Date when the user was created (default to current date)
    updated_at: { type: Date } // Date when the user details was last updated (optional)
});

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function (next) {
    // If the password has not been modified, move to the next middleware
    if (!this.isModified('password')) {
        return next();
    }
    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();  // Move to the next middleware after hashing the password
});

// Method to compare input password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
    // Compare the provided password with the stored hash
    return await bcrypt.compare(password, this.password);
};

// Export the User model, which will be used to interact with the users collection in MongoDB
module.exports = mongoose.model('User', userSchema);
