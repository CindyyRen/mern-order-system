// const MenuCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String
// });

// module.exports = mongoose.model('MenuCategory', MenuCategorySchema);
const categorySchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId, // 使用 ObjectId 做唯一标识
    required: true,
    unique: true
  },
  category_name: {
    type: String,
    required: true, // 分类名称是必填的
    trim: true
  },
  description: {
    type: String,
    default: "" // 可以不填写描述
  },
  image: {
    type: String,
    default: "" // 可选的分类图标或图片链接
  }
}, {
  timestamps: true // 添加创建和更新的时间戳
});

// 创建分类模型
const Category = mongoose.model('Category', categorySchema);

export default Category;