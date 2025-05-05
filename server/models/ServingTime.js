const TimeSlotSchema = new mongoose.Schema({
  key: { type: String, required: true },   // 如 'lunch'
  label: { type: String, required: true }  // 如 '午餐'
});

export default mongoose.model('TimeSlot', TimeSlotSchema);
