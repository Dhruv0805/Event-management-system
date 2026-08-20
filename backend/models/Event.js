const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Event title is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    date: { type: Date, required: [true, 'Event date is required'] },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true, min: 1 },
    registrationDeadline: { type: Date, required: true },
    image: { type: String, default: '' },
    rules: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'upcoming', 'published', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

eventSchema.virtual('registeredCount', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'eventId',
  count: true,
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
