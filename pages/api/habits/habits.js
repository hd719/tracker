// Database collection (model data)

import mongoose, { schema, Schema } from "mongoose";

// how the data will in the database
export const HabitsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model.habits || mongoose.model("habits", HabitsSchema); // attaches the schema to the model
