import mongoose from 'mongoose';

const completedActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true
  }
});

export const CompletedActivity = mongoose.model('CompletedActivity', completedActivitySchema);
