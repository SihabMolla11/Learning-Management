import { Document, Schema, Types, model } from "mongoose";

interface CompletedLectureDTO extends Document {
  user_id: Types.ObjectId;
  module_id: Types.ObjectId;
  course_id: Types.ObjectId;
  lecture_id: Types.ObjectId;
  module_number: number;
  lecture_number: number;
  created_at: Date;
  updated_at: Date;
}

const CompletedLectureSchema = new Schema<CompletedLectureDTO>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    module_id: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lecture_id: { type: Schema.Types.ObjectId, ref: "Lecture", required: true },
    module_number: { type: Number, required: true },
    lecture_number: { type: Number, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CompletedLecture = model<CompletedLectureDTO>("CompletedLecture", CompletedLectureSchema);
export default CompletedLecture;
