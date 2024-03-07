import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
	type: String,
	required: true,
	unique: true,
	trim: true
    },
    email: {
	type: String,
	required: true,
	unique: true,
	trim: true
    },
    password: {
	type: String,
	required: true,
	minlength: 8
    },
    createdAt: {
	type: Date,
	default: Date.now
    }
});

const User = model('User', userSchema);

export default User;
