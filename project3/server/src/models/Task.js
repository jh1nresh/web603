import mongoose from 'mongoose'

export const PRIORITIES = ['high', 'medium', 'low']

const taskSchema = new mongoose.Schema(
  {
    // Every task belongs to exactly one user; queries always filter on this.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title must be 120 characters or fewer'],
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: [500, 'Description must be 500 characters or fewer'],
    },
    priority: {
      type: String,
      enum: { values: PRIORITIES, message: 'Priority must be high, medium, or low' },
      default: 'medium',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

taskSchema.methods.toPublic = function toPublic() {
  return {
    id: this._id.toString(),
    title: this.title,
    description: this.description,
    priority: this.priority,
    completed: this.completed,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

export default mongoose.model('Task', taskSchema)
