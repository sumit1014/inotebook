import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{ type:String,required:true}, 
  email: { type:String,required:true,unique:true},
  password: { type:String,required:true},
  date: { type: Date, default: Date.now }
});
// Use export default for ES module exports
export default mongoose.model("user", UserSchema);