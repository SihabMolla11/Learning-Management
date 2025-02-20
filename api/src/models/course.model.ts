import { Document, Schema, model } from "mongoose";

interface CourseDTO extends Document {
  thumbnail: string;
  slug: string;
  title: string;
  price: number;
  description?: string;
  course_duration: string;
  start_time: Date;
  end_time: Date;
  enrolment_start_date: Date;
  enrolment_end_date: Date;
  created_at: Date;
  updated_at: Date;
}

const CourseSchema = new Schema<CourseDTO>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    course_duration: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    enrolment_start_date: { type: Date, required: true },
    enrolment_end_date: { type: Date, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Course = model<CourseDTO>("Course", CourseSchema);
export default Course;
