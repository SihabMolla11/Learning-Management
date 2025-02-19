import { Document, Schema, Types, model } from "mongoose";

interface LectureDTO extends Document {
  course_id: Types.ObjectId;
  module_id: Types.ObjectId;
  title: string;
  video: string;
  pdf: string;
  lecture_number: number;
  created_at: Date;
  updated_at: Date;
}

const LectureSchema = new Schema<LectureDTO>(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    module_id: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    video: { type: String, required: true },
    lecture_number: { type: Number, required: true },
    pdf: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Lecture = model<LectureDTO>("Lecture", LectureSchema);
export default Lecture;
