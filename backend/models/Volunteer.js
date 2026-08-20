const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    task: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['assigned', 'in-progress', 'completed'],
      default: 'assigned',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
