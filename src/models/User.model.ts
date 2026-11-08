import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [1, "Name must not be empty"]
  },
  email: {
    type:String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  password: {
    type:String,
    required: [true, "Password is required"]
  }
});

const User = mongoose.model("User", UserSchema);

export default User;