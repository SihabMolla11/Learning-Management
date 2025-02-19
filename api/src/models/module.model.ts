import { Schema, model, Document, Types } from "mongoose";

interface ModelDTO extends Document {
  title: string;
  module_number: number;
  description?: string;
  course_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const ModuleSchema = new Schema<ModelDTO>(
  {
    title: { type: String, required: true },
    module_number: { type: Number, required: true },
    description: { type: String },
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Module = model<ModelDTO>("Module", ModuleSchema);
export default Module;
