
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }, // bcrypt加密后的密码
  role: { 
    type: String, 
    enum: ['guest', 'customer', 'staff', 'admin'], 
    default: 'guest' 
  },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);