// Database collection
import mongoose, { Schema } from "mongoose";

// how the data will in the database
export const HabitsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.habits || mongoose.model("habits", HabitsSchema); // attaches the schema to the model
