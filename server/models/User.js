const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: String,
  is_admin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
