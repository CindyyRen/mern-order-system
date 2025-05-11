import { Schema, model, Types } from 'mongoose';

const categorySchema = new Schema(
  {
    category_id: {
      type: String,
      required: true,
      unique: true,
    },
    category_name: {
      type: String,
      required: true, // 分类名称是必填的
      trim: true,
    },
    category_name_en: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '', // 可以不填写描述
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    image: {
      type: String,
      default: '', // 可选的分类图标或图片链接
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // 添加创建和更新的时间戳
  }
);

// 创建分类模型
const Category = model('Category', categorySchema);

export default Category;
