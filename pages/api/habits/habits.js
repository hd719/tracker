// Database collection
import mongoose, { Schema } from "mongoose";

const EventsSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
});

// how the data will in the database
export const HabitsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  event: [EventsSchema],
});

export default mongoose.models.habits || mongoose.model("habits", HabitsSchema); // attaches the schema to the model
