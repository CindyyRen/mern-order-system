import mongoose from 'mongoose';
const MenuTagSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // 如 'chilli'
  label: { type: String, required: true }, // 如 '辣'
  icon: { type: String }, // emoji 或图标路径
  description: { type: String }, // 可选描述
});

export default mongoose.model('MenuTag', MenuTagSchema);
