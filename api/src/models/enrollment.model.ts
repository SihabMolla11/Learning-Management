import { Document, Schema, Types, model } from "mongoose";

enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

interface EnrollmentDTO extends Document {
  course_id: Types.ObjectId;
  user_id: Types.ObjectId;
  price: number;
  payment_status: PaymentStatus;
  created_at: Date;
  updated_at: Date;
}

const EnrollmentSchema = new Schema<EnrollmentDTO>(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    payment_status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Enrollment = model<EnrollmentDTO>("Enrollment", EnrollmentSchema);
export default Enrollment;
